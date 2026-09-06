import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

const API_KEY = process.env.GEMINI_API_KEY;

export async function POST(request: NextRequest) {
  let linkedin: any = {};
  let targetCareer = 'Software Engineer';

  try {
    const body = await request.json().catch(() => ({}));
    linkedin = body.linkedin || {};
    targetCareer = body.targetCareer || linkedin.role || 'Software Engineer';

    if (!linkedin || Object.keys(linkedin).length === 0) {
      return NextResponse.json(
        { error: 'LinkedIn profile data is required' },
        { status: 400 }
      );
    }

    if (!API_KEY) {
      return NextResponse.json(generateDemoOptimization(linkedin, targetCareer));
    }

    const genAI = new GoogleGenerativeAI(API_KEY);
    const model = genAI.getGenerativeModel({
      model: 'gemini-1.5-flash',
      generationConfig: { responseMimeType: 'application/json' }
    });

    const prompt = buildLinkedInPrompt(linkedin, targetCareer);
    const result = await model.generateContent(prompt);
    const responseText = result.response.text();

    try {
      const parsed = JSON.parse(responseText);
      const validated = normalizeLinkedInOutput(parsed, linkedin, targetCareer);
      return NextResponse.json({ ...validated, source: 'gemini' });
    } catch (parseErr) {
      const jsonMatch = responseText.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        const parsed = JSON.parse(jsonMatch[0]);
        const validated = normalizeLinkedInOutput(parsed, linkedin, targetCareer);
        return NextResponse.json({ ...validated, source: 'gemini' });
      }
      throw parseErr;
    }

  } catch (error: any) {
    console.error('LinkedIn Optimization Route Error:', error?.message || error);
    return NextResponse.json(generateDemoOptimization(linkedin, targetCareer));
  }
}

function buildLinkedInPrompt(linkedin: any, targetCareer: string): string {
  return `You are a world-class LinkedIn executive branding coach and technical recruiter.
Optimize the following candidate's LinkedIn profile for a "${targetCareer}" role.

Current Candidate Profile:
- Current Headline: ${linkedin.headline || linkedin.role || 'Not provided'}
- Current About Section: ${linkedin.about || 'Not provided'}
- Target Role: ${targetCareer}
- Skills: ${linkedin.skills || 'Not provided'}
- Experience: ${linkedin.experience || 'Early career / Student'}
- Education: ${linkedin.education || 'Undergraduate'}

Respond ONLY with a valid JSON object matching this schema:
{
  "optimizedHeadline": "Compelling 1-line headline (under 120 characters) with role, skills, and value proposition",
  "optimizedAbout": "Professional, engaging 3-paragraph About section that tells their story, highlights technical accomplishments, and ends with a call to connect",
  "keywords": ["Keyword1", "Keyword2", "Keyword3", "Keyword4", "Keyword5"],
  "recommendedSkills": ["Skill 1", "Skill 2", "Skill 3", "Skill 4"],
  "profileImprovementChecklist": [
    "Checklist item 1 (actionable)",
    "Checklist item 2",
    "Checklist item 3",
    "Checklist item 4"
  ],
  "profileStrength": 85
}`;
}

function normalizeLinkedInOutput(data: any, linkedin: any, targetCareer: string) {
  return {
    optimizedHeadline: typeof data.optimizedHeadline === 'string' && data.optimizedHeadline.length > 10
      ? data.optimizedHeadline
      : `${targetCareer} | ${linkedin.skills?.split(',')[0]?.trim() || 'Software Development'} | Building High-Impact Solutions`,
    optimizedAbout: typeof data.optimizedAbout === 'string' && data.optimizedAbout.length > 30
      ? data.optimizedAbout
      : `I am an ambitious ${targetCareer} passionate about building scalable, efficient software and solving complex technical challenges. With a solid foundation in ${linkedin.skills || 'core engineering principles'}, I focus on creating reliable solutions that deliver real-world value.\n\nThroughout my academic journey and practical projects, I have developed a disciplined approach to learning, clean code architecture, and collaborative problem-solving.\n\nI am eager to connect with engineering teams, mentors, and fellow developers. Feel free to reach out to discuss opportunities or collaborate on innovative projects!`,
    keywords: Array.isArray(data.keywords) && data.keywords.length > 0 ? data.keywords : ['Software Engineering', 'System Architecture', 'Clean Code', 'Problem Solving', 'Git'],
    recommendedSkills: Array.isArray(data.recommendedSkills) && data.recommendedSkills.length > 0 ? data.recommendedSkills : ['Python', 'Data Structures', 'REST APIs', 'Cloud Computing'],
    profileImprovementChecklist: Array.isArray(data.profileImprovementChecklist) && data.profileImprovementChecklist.length > 0 ? data.profileImprovementChecklist : [
      'Add a high-resolution professional headshot with neutral lighting.',
      'Feature your top 2 GitHub projects with live demonstration links in the Featured section.',
      'Request 2-3 skill endorsements or recommendations from professors or project peers.',
      'Publish short technical insights or takeaways from projects you have built.'
    ],
    profileStrength: typeof data.profileStrength === 'number' ? Math.min(100, Math.max(50, data.profileStrength)) : 85
  };
}

function generateDemoOptimization(linkedin: any, targetCareer: string) {
  const role = linkedin.role || targetCareer || 'Aspiring Technologist';
  const skills = linkedin.skills ? linkedin.skills.split(',').map((s: string) => s.trim()).filter(Boolean) : ['Python', 'Problem Solving', 'Data Structures'];
  const firstSkill = skills[0] || 'Software Development';
  const secondSkill = skills[1] || 'Modern Technologies';

  return {
    source: 'local-demo',
    optimizedHeadline: `Aspiring ${targetCareer} | ${firstSkill} & ${secondSkill} | Building Scalable Real-World Solutions`,
    optimizedAbout: `I am an ambitious and focused technologist specializing in ${targetCareer} foundations, with demonstrated proficiency in ${skills.slice(0, 3).join(', ')}.\n\nI thrive at the intersection of theory and practical execution—having engineered projects emphasizing performance, clean architecture, and user-centric problem-solving. My background combines strong analytical reasoning with a continuous drive to learn and master cutting-edge industry practices.\n\nI am actively seeking internship and junior engineering opportunities where I can contribute to high-impact technical initiatives. Let's connect or discuss ideas!`,
    keywords: [
      targetCareer,
      firstSkill,
      secondSkill,
      'Full Lifecycle Development',
      'Algorithms',
      'Agile Methodology',
      'Continuous Learning'
    ],
    recommendedSkills: [
      firstSkill,
      secondSkill,
      'Git & GitHub',
      'REST APIs',
      'System Testing',
      'Technical Communication'
    ],
    profileImprovementChecklist: [
      'Update headline to highlight role, top skills, and what value you deliver.',
      'Pin your top repository or live project demo in the "Featured" section.',
      'Write detailed bullet points under education/projects emphasizing technical outcomes.',
      'Add at least 5 relevant skills to your LinkedIn Skills section and reorder top 3.'
    ],
    profileStrength: 82
  };
}
