/**
 * Safe client-side resume file parser.
 * Extracts text and maps key resume sections from PDF, DOCX, and TXT files
 * entirely in-browser without third-party network requests.
 */

export interface ParsedResumeData {
  name?: string;
  email?: string;
  phone?: string;
  summary?: string;
  skills?: string;
  education?: string;
  experience?: string;
  projects?: string;
  certifications?: string;
  rawText: string;
}

export async function parseResumeFile(file: File): Promise<ParsedResumeData> {
  const extension = file.name.split('.').pop()?.toLowerCase() || '';

  let rawText = '';

  if (extension === 'txt' || extension === 'md' || extension === 'rtf') {
    rawText = await file.text();
  } else if (extension === 'pdf') {
    rawText = await extractTextFromPdf(file);
  } else if (extension === 'docx') {
    rawText = await extractTextFromDocx(file);
  } else {
    // Fallback: Attempt text reading
    try {
      rawText = await file.text();
    } catch {
      throw new Error(`Unsupported file format (.${extension}). Please upload a PDF, DOCX, or TXT file.`);
    }
  }

  if (!rawText || rawText.trim().length === 0) {
    throw new Error('Unable to extract text from file. Please ensure the document contains readable text.');
  }

  return extractResumeSections(rawText);
}

/**
 * Basic PDF text stream parser extracting text segments without external dependencies.
 */
async function extractTextFromPdf(file: File): Promise<string> {
  const buffer = await file.arrayBuffer();
  const bytes = new Uint8Array(buffer);
  let text = '';

  // Decode stream text chunks between BT (Begin Text) and ET (End Text) or raw string literals
  const decoder = new TextDecoder('latin1');
  const content = decoder.decode(bytes);

  // Extract strings enclosed in parentheses: (Text) Tj or [(T)(e)(x)(t)] TJ
  const tjRegex = /\(([^)]+)\)\s*Tj/g;
  let match;
  const chunks: string[] = [];

  while ((match = tjRegex.exec(content)) !== null) {
    chunks.push(match[1]);
  }

  if (chunks.length > 5) {
    text = chunks.join(' ').replace(/\\([()\\])/g, '$1');
  } else {
    // Fallback: extract printable ASCII sequences longer than 3 characters
    const clean = content.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F-\xFF]/g, ' ');
    const readable = clean.match(/[A-Za-z0-9@.,:; \-_\/]{4,}/g);
    text = readable ? readable.join('\n') : '';
  }

  return text;
}

/**
 * Basic DOCX text parser.
 * A .docx file is a ZIP container containing word/document.xml.
 */
async function extractTextFromDocx(file: File): Promise<string> {
  const buffer = await file.arrayBuffer();
  const bytes = new Uint8Array(buffer);
  const decoder = new TextDecoder('utf-8');
  const content = decoder.decode(bytes);

  // Extract text inside <w:t> or <w:t ...>...</w:t> tags
  const wtRegex = /<w:t[^>]*>([^<]+)<\/w:t>/g;
  let match;
  const chunks: string[] = [];

  while ((match = wtRegex.exec(content)) !== null) {
    chunks.push(match[1]);
  }

  if (chunks.length > 0) {
    return chunks.join(' ');
  }

  // Fallback if XML structure was compressed or raw
  const readable = content.match(/[A-Za-z0-9@.,:; \-_\/]{4,}/g);
  return readable ? readable.join('\n') : '';
}

/**
 * Analyzes raw extracted resume text and categorizes fields into standard resume sections.
 */
export function extractResumeSections(rawText: string): ParsedResumeData {
  const lines = rawText.split(/\r?\n/).map(l => l.trim()).filter(Boolean);

  // 1. Email extraction
  const emailMatch = rawText.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/);
  const email = emailMatch ? emailMatch[0] : '';

  // 2. Phone extraction
  const phoneMatch = rawText.match(/(\+?\d{1,3}[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}/);
  const phone = phoneMatch ? phoneMatch[0] : '';

  // 3. Name heuristic: First non-empty line that doesn't contain @ or http
  let name = '';
  for (const line of lines.slice(0, 5)) {
    if (!line.includes('@') && !line.includes('http') && line.length < 40 && /^[A-Za-z\s.'-]+$/.test(line)) {
      name = line;
      break;
    }
  }

  // Section categorization
  const sections: Record<string, string[]> = {
    summary: [],
    skills: [],
    experience: [],
    projects: [],
    education: [],
    certifications: []
  };

  let currentSection = 'summary';

  const sectionKeywords: Record<string, RegExp> = {
    skills: /^(technical\s+)?skills|technologies|proficiencies|competencies/i,
    experience: /^(work\s+|professional\s+)?experience|employment|work\s+history/i,
    projects: /^(academic\s+|technical\s+)?projects|portfolio|personal\s+projects/i,
    education: /^education|academics|academic\s+background|degrees/i,
    certifications: /^certifications|credentials|licenses|awards/i,
    summary: /^summary|professional\s+summary|profile|about\s+me/i
  };

  for (const line of lines) {
    let matched = false;
    for (const [sec, pattern] of Object.entries(sectionKeywords)) {
      if (pattern.test(line.replace(/[^a-zA-Z\s]/g, '').trim())) {
        currentSection = sec;
        matched = true;
        break;
      }
    }

    if (!matched && currentSection) {
      sections[currentSection].push(line);
    }
  }

  return {
    rawText,
    name: name || undefined,
    email: email || undefined,
    phone: phone || undefined,
    summary: sections.summary.length ? sections.summary.slice(0, 4).join(' ') : undefined,
    skills: sections.skills.length ? sections.skills.join(', ') : undefined,
    experience: sections.experience.length ? sections.experience.join('\n') : undefined,
    projects: sections.projects.length ? sections.projects.join('\n') : undefined,
    education: sections.education.length ? sections.education.join('\n') : undefined,
    certifications: sections.certifications.length ? sections.certifications.join('\n') : undefined
  };
}
