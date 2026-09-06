import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

const API_KEY = process.env.GEMINI_API_KEY;

export async function POST(request: NextRequest) {
  let resume: any = {};
  let targetCareer = 'Software Engineer';

  try {
    const body = await request.json().catch(() => ({}));
    resume = body.resume || {};
    targetCareer = body.targetCareer || 'Software Engineer';

    if (!resume || Object.keys(resume).length === 0) {
      return NextResponse.json(
        { error: 'Resume data is required' },
        { status: 400 }
      );
    }

    if (!API_KEY) {
      return NextResponse.json(generateDemoAnalysis(resume, targetCareer));
    }

    const genAI = new GoogleGenerativeAI(API_KEY);
    const model = genAI.getGenerativeModel({
      model: 'gemini-1.5-flash',
      generationConfig: { responseMimeType: 'application/json' }
    });

    const prompt = buildResumePrompt(resume, targetCareer);
    const result = await model.generateContent(prompt);
    const responseText = result.response.text();

    try {
      const parsed = JSON.parse(responseText);
      const validated = validateAndNormalizeResumeAnalysis(parsed, resume, targetCareer);
      return NextResponse.json({ ...validated, source: 'gemini' });
    } catch (parseError) {
      const jsonMatch = responseText.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        const parsed = JSON.parse(jsonMatch[0]);
        const validated = validateAndNormalizeResumeAnalysis(parsed, resume, targetCareer);
        return NextResponse.json({ ...validated, source: 'gemini' });
      }
      throw parseError;
    }

  } catch (error: any) {
    console.error('Resume Analysis Error:', error?.message || error);
    return NextResponse.json(generateDemoAnalysis(resume, targetCareer));
  }
}

function buildResumePrompt(resume: any, targetCareer: string): string {
  return `You are an expert technical recruiter and ATS specialist analyzing a resume for a "${targetCareer}" role.
Analyze the following candidate resume thoroughly and return a strict JSON object:

Candidate Resume Details:
- Name: ${resume.name || 'Not provided'}
- Professional Summary: ${resume.summary || 'Not provided'}
- Skills: ${resume.skills || 'Not provided'}
- Projects: ${resume.projects || 'Not provided'}
- Experience: ${resume.experience || 'Not provided'}
- Education: ${resume.education || 'Not provided'}
- Certifications: ${resume.certifications || 'None'}

Your response MUST adhere strictly to this JSON format:
{
  "score": 75,
  "overallScore": 75,
  "strengths": ["Clear strength 1 with explanation", "Strength 2", "Strength 3"],
  "weaknesses": ["Specific weakness 1", "Weakness 2"],
  "missingKeywords": ["Keyword1", "Keyword2", "Keyword3", "Keyword4"],
  "atsSuggestions": ["ATS formatting or content tip 1", "ATS tip 2", "ATS tip 3"],
  "rewrittenSummary": "High-impact, metric-driven rewritten professional summary (2-3 sentences)",
  "recommendedSkills": ["Skill 1", "Skill 2", "Skill 3"],
  "priorities": [
    {"priority": "High", "item": "Actionable task description"},
    {"priority": "Medium", "item": "Actionable task description"},
    {"priority": "Low", "item": "Actionable task description"}
  ]
}`;
}

function validateAndNormalizeResumeAnalysis(data: any, resume: any, targetCareer: string) {
  const score = typeof data.score === 'number' ? Math.min(100, Math.max(0, data.score))
    : typeof data.overallScore === 'number' ? Math.min(100, Math.max(0, data.overallScore)) : 70;

  return {
    score,
    overallScore: score,
    strengths: Array.isArray(data.strengths) && data.strengths.length > 0 ? data.strengths : ['Relevant educational background', 'Clear foundational skills listed'],
    weaknesses: Array.isArray(data.weaknesses) && data.weaknesses.length > 0 ? data.weaknesses : ['Need more measurable metrics in project descriptions'],
    missingKeywords: Array.isArray(data.missingKeywords) && data.missingKeywords.length > 0 ? data.missingKeywords : ['Git', 'Agile', 'Unit Testing', 'CI/CD'],
    atsSuggestions: Array.isArray(data.atsSuggestions) && data.atsSuggestions.length > 0 ? data.atsSuggestions : [
      'Use standard reverse-chronological section headers',
      'Include action verbs at the start of each bullet point',
      'Avoid multi-column tables or graphics that confuse ATS parsers'
    ],
    rewrittenSummary: typeof data.rewrittenSummary === 'string' && data.rewrittenSummary.length > 20
      ? data.rewrittenSummary
      : `Results-oriented ${targetCareer} candidate with strong hands-on problem-solving and software development skills. Proven ability to build practical applications and collaborate effectively to deliver impactful technical solutions.`,
    recommendedSkills: Array.isArray(data.recommendedSkills) && data.recommendedSkills.length > 0 ? data.recommendedSkills : ['System Design', 'Git', 'Testing'],
    priorities: Array.isArray(data.priorities) && data.priorities.length > 0 ? data.priorities : [
      { priority: 'High', item: `Add 2 key projects demonstrating end-to-end ${targetCareer} capabilities.` },
      { priority: 'Medium', item: 'Quantify impact with metrics (e.g., % improvement, users served, latency reduction).' },
      { priority: 'Medium', item: 'Incorporate missing ATS industry keywords into project descriptions.' }
    ]
  };
}

function generateDemoAnalysis(resume: any, targetCareer: string) {
  const hasName = resume.name?.trim().length > 0;
  const hasSummary = resume.summary?.trim().length > 30;
  const hasExperience = resume.experience?.trim().length > 15;
  const hasProjects = resume.projects?.trim().length > 20;
  const hasSkills = resume.skills?.trim().length > 10;

  let calculatedScore = 42;
  if (hasName) calculatedScore += 8;
  if (hasSummary) calculatedScore += 15;
  if (hasExperience) calculatedScore += 15;
  if (hasProjects) calculatedScore += 15;
  if (hasSkills) calculatedScore += 10;
  calculatedScore = Math.min(94, calculatedScore);

  const roleKeywords: Record<string, string[]> = {
    'AI / ML Engineer': ['PyTorch', 'TensorFlow', 'Model Evaluation', 'Feature Engineering', 'Docker', 'MLflow', 'Python'],
    'Data Scientist': ['Pandas', 'Statistical Modeling', 'Hypothesis Testing', 'SQL', 'Data Visualization', 'Scikit-Learn'],
    'Data Analyst': ['SQL Queries', 'Tableau / PowerBI', 'Excel Modeling', 'Data Cleaning', 'Business Insights', 'Python'],
    'Software Engineer': ['Data Structures & Algorithms', 'REST APIs', 'Git', 'CI/CD', 'Unit Testing', 'TypeScript / Java'],
    'Full Stack Developer': ['React', 'Node.js', 'PostgreSQL / MongoDB', 'API Architecture', 'Responsive Design', 'Docker'],
    'Cloud / DevOps Engineer': ['AWS / GCP', 'Docker', 'Kubernetes', 'Terraform', 'Linux', 'Bash Scripting']
  };

  const matchedKeywords = roleKeywords[targetCareer] || ['Git', 'Python', 'SQL', 'System Architecture', 'Agile'];

  return {
    source: 'local-demo',
    score: calculatedScore,
    overallScore: calculatedScore,
    strengths: [
      hasSummary ? 'Includes a clear professional summary statement' : 'Standard contact layout present',
      hasProjects ? 'Highlights practical project implementations' : 'Clear educational degree and context',
      hasSkills ? 'Outlines core technical competencies' : 'Clean single-page structure'
    ],
    weaknesses: [
      !hasExperience ? 'Lacks industry internship or formal work experience' : 'Could quantify experience with measurable results',
      !hasProjects ? 'Missing comprehensive project highlights' : 'Project bullets could follow the STAR format more rigorously',
      (resume.summary?.length || 0) < 50 ? 'Professional summary is brief and needs stronger value propositions' : 'Missing some modern industry ATS keywords'
    ],
    missingKeywords: matchedKeywords.slice(0, 5),
    atsSuggestions: [
      'Ensure standard headings: Summary, Skills, Experience, Projects, Education.',
      'Quantify results using metrics: "Improved runtime by 25%" or "Processed 10,000+ records".',
      `Align project bullet points with targeted ${targetCareer} job specifications.`,
      'Maintain standard clean formatting without nested tables or multi-column layouts for ATS compatibility.'
    ],
    rewrittenSummary: `Driven and analytical ${targetCareer} candidate with demonstrated expertise in ${resume.skills?.split(',').slice(0, 3).join(', ') || 'modern software and analytical tools'}. Experienced in designing scalable projects and translating technical requirements into efficient, measurable outcomes. Seeking an opportunity to deliver immediate value while advancing industry best practices.`,
    recommendedSkills: matchedKeywords.slice(0, 4),
    priorities: [
      { priority: 'High', item: `Embed ${matchedKeywords[0]} and ${matchedKeywords[1]} directly into project descriptions.` },
      { priority: 'High', item: 'Rewrite bullet points using action verbs + situation + measurable result.' },
      { priority: 'Medium', item: 'Add public GitHub repository and live deployment links to each project.' },
      { priority: 'Medium', item: 'Tailor summary section to address specific requirements in job descriptions.' }
    ]
  };
}
