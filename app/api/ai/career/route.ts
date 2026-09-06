import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

const API_KEY = process.env.GEMINI_API_KEY;

export async function POST(request: NextRequest) {
  let body: any = {};
  try {
    body = await request.json().catch(() => ({}));
    const action = body.action || 'guidance';
    const targetCareer = body.targetCareer || 'Software Engineer';
    const currentSkills = Array.isArray(body.currentSkills) ? body.currentSkills : [];
    const experience = body.experience || '';
    const education = body.education || '';
    const goal = body.goal || '';
    const studyTime = body.studyTime || '1-2 hours daily';

    if (!targetCareer) {
      return NextResponse.json(
        { error: 'Target career is required' },
        { status: 400 }
      );
    }

    if (!API_KEY) {
      return NextResponse.json(generateLocalCareerData(action, targetCareer, currentSkills, studyTime));
    }

    const genAI = new GoogleGenerativeAI(API_KEY);
    const model = genAI.getGenerativeModel({
      model: 'gemini-1.5-flash',
      generationConfig: { responseMimeType: 'application/json' }
    });

    const prompt = buildPromptForAction(action, targetCareer, currentSkills, experience, education, goal, studyTime);
    const result = await model.generateContent(prompt);
    const responseText = result.response.text();

    try {
      const parsed = JSON.parse(responseText);
      return NextResponse.json({ ...parsed, source: 'gemini' });
    } catch (parseError) {
      const jsonMatch = responseText.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        const parsed = JSON.parse(jsonMatch[0]);
        return NextResponse.json({ ...parsed, source: 'gemini' });
      }
      throw parseError;
    }

  } catch (error: any) {
    console.error('Career AI Route Error:', error?.message || error);
    return NextResponse.json(
      generateLocalCareerData(body.action || 'guidance', body.targetCareer || 'Software Engineer', body.currentSkills || [], body.studyTime || '1-2 hours')
    );
  }
}

function buildPromptForAction(action: string, targetCareer: string, currentSkills: string[], experience: string, education: string, goal: string, studyTime: string): string {
  if (action === 'roadmap') {
    return `Create a personalized career learning roadmap for a student aiming for "${targetCareer}".
Current Skills: ${currentSkills.join(', ') || 'None listed'}
Education: ${education}
Experience: ${experience}
Study Time Available: ${studyTime}

Respond in strict JSON:
{
  "title": "${targetCareer} Personalized Roadmap",
  "summary": "High level strategy overview",
  "milestones": [
    {
      "step": 1,
      "title": "Milestone Title",
      "description": "What to learn and do in this phase",
      "estimatedWeeks": 3,
      "tasks": ["Task 1", "Task 2", "Task 3"]
    },
    {
      "step": 2,
      "title": "Milestone Title",
      "description": "What to build",
      "estimatedWeeks": 4,
      "tasks": ["Task 1", "Task 2", "Task 3"]
    },
    {
      "step": 3,
      "title": "Milestone Title",
      "description": "Advanced topics & integration",
      "estimatedWeeks": 4,
      "tasks": ["Task 1", "Task 2"]
    },
    {
      "step": 4,
      "title": "Milestone Title",
      "description": "Portfolio & Applications",
      "estimatedWeeks": 3,
      "tasks": ["Task 1", "Task 2"]
    }
  ]
}`;
  }

  if (action === 'skill_gap') {
    return `Perform a rigorous skill-gap analysis for a student targeting "${targetCareer}".
Current Skills possessed: ${currentSkills.join(', ') || 'None listed'}

Respond in strict JSON:
{
  "criticalSkills": ["Top must-have skill 1", "Critical skill 2", "Critical skill 3"],
  "importantSkills": ["Important supporting skill 1", "Important skill 2"],
  "optionalSkills": ["Nice-to-have skill 1", "Nice-to-have skill 2"],
  "learningOrder": ["Step 1 skill", "Step 2 skill", "Step 3 skill", "Step 4 skill"],
  "recommendedProjects": [
    {
      "name": "Project Name 1",
      "description": "What it solves and why recruiters value it",
      "skillsCovered": ["Skill A", "Skill B"]
    },
    {
      "name": "Project Name 2",
      "description": "Advanced architectural project",
      "skillsCovered": ["Skill C", "Skill D"]
    }
  ],
  "advice": "Strategic advice on bridging the gap efficiently"
}`;
  }

  // Default guidance action
  return `Provide career guidance for a student targeting "${targetCareer}".
Current Skills: ${currentSkills.join(', ') || 'Foundational'}
Education: ${education}
Experience: ${experience}

Respond in strict JSON:
{
  "matchPercentage": 75,
  "matchingSkills": ["Skill user has"],
  "missingSkills": ["Key skills user lacks"],
  "recommendedLearning": ["Resource or topic to study"],
  "projectRecommendations": [
    {"title": "Project 1", "description": "Brief summary", "impact": "Why it matters"}
  ],
  "interviewTopics": ["Core topic 1", "Core topic 2", "Core topic 3"],
  "marketOutlook": "Realistic career prospects for college graduates in this field"
}`;
}

function generateLocalCareerData(action: string, targetCareer: string, currentSkills: string[], studyTime: string) {
  if (action === 'roadmap') {
    return {
      source: 'local-demo',
      title: `${targetCareer} Practical Learning Roadmap`,
      summary: `Tailored roadmap based on ${studyTime} study pace, moving systematically from core principles to portfolio proof.`,
      milestones: [
        {
          step: 1,
          title: 'Core Fundamentals & Tooling',
          description: `Master the fundamental programming language, data structures, and Git version control for ${targetCareer}.`,
          estimatedWeeks: 3,
          tasks: ['Establish solid programming hygiene', 'Write unit tests for core algorithms', 'Configure GitHub workflow']
        },
        {
          step: 2,
          title: 'Specialized Domain Competency',
          description: `Deep dive into the primary frameworks and tools required in ${targetCareer} job descriptions.`,
          estimatedWeeks: 4,
          tasks: ['Build mini-components testing framework limits', 'Work with real-world datasets or APIs', 'Document design trade-offs']
        },
        {
          step: 3,
          title: 'Full-Scale Capstone Project',
          description: 'Architect, build, and deploy an end-to-end production-grade application solving a tangible problem.',
          estimatedWeeks: 4,
          tasks: ['Implement automated CI/CD pipeline', 'Containerize with Docker', 'Deploy live with interactive frontend']
        },
        {
          step: 4,
          title: 'Interview Mastery & Applications',
          description: 'Refine technical communication, prepare STAR behavioral responses, and target internship applications.',
          estimatedWeeks: 3,
          tasks: ['Complete 20 targeted domain interview questions', 'Audit resume with ATS keywords', 'Apply to 15 targeted positions']
        }
      ]
    };
  }

  if (action === 'skill_gap') {
    const roleSkillMap: Record<string, { critical: string[]; important: string[]; optional: string[] }> = {
      'AI / ML Engineer': {
        critical: ['Python', 'PyTorch or TensorFlow', 'Scikit-Learn', 'Math & Statistics (Linear Algebra, Calculus)'],
        important: ['Docker', 'MLOps & Model Tracking (MLflow)', 'FastAPI', 'SQL'],
        optional: ['Kubernetes', 'CUDA Programming', 'Ray']
      },
      'Data Scientist': {
        critical: ['Python', 'SQL', 'Pandas & NumPy', 'Hypothesis Testing & Statistics'],
        important: ['Scikit-Learn', 'Data Visualization (Seaborn, Plotly)', 'Feature Engineering'],
        optional: ['BigQuery', 'A/B Testing Frameworks', 'Apache Spark']
      },
      'Data Analyst': {
        critical: ['Advanced SQL', 'Excel & Spreadsheets', 'Tableau or Power BI'],
        important: ['Python (Pandas)', 'Data Cleaning', 'Business Metric Definition'],
        optional: ['R', 'Statistical Significance', 'Google Analytics']
      },
      'Software Engineer': {
        critical: ['Data Structures & Algorithms', 'At least one OOP language (Python, Java, TypeScript)', 'Git'],
        important: ['RESTful API Design', 'Relational Databases (PostgreSQL)', 'Unit & Integration Testing'],
        optional: ['Docker & Cloud Deployment', 'GraphQL', 'System Design']
      }
    };

    const mapping = roleSkillMap[targetCareer] || {
      critical: ['Core Programming Language', 'Data Structures', 'Git & Version Control'],
      important: ['Database Architecture', 'API Development', 'Testing & Debugging'],
      optional: ['Cloud Fundamentals', 'CI/CD Pipelines']
    };

    const ownedLower = currentSkills.map(s => s.toLowerCase());
    const criticalMissing = mapping.critical.filter(s => !ownedLower.some(o => s.toLowerCase().includes(o)));
    const importantMissing = mapping.important.filter(s => !ownedLower.some(o => s.toLowerCase().includes(o)));

    return {
      source: 'local-demo',
      criticalSkills: criticalMissing.length ? criticalMissing : mapping.critical,
      importantSkills: importantMissing.length ? importantMissing : mapping.important,
      optionalSkills: mapping.optional,
      learningOrder: [
        criticalMissing[0] || mapping.critical[0],
        criticalMissing[1] || mapping.critical[1],
        importantMissing[0] || mapping.important[0],
        'Comprehensive Portfolio Project'
      ],
      recommendedProjects: [
        {
          name: `${targetCareer} End-to-End System`,
          description: `Build a production-ready application demonstrating ${mapping.critical.slice(0, 2).join(' and ')} with automated testing and public GitHub documentation.`,
          skillsCovered: mapping.critical.slice(0, 3)
        },
        {
          name: 'Performance & Scaling Case Study',
          description: 'Profile and optimize an existing service, cutting latency or resource consumption and writing a technical blog breakdown.',
          skillsCovered: mapping.important.slice(0, 2)
        }
      ],
      advice: `Focus first on mastering ${criticalMissing[0] || mapping.critical[0]}. Building one finished, deployed project provides more credibility in interviews than five incomplete tutorials.`
    };
  }

  return {
    source: 'local-demo',
    matchPercentage: 72,
    matchingSkills: currentSkills.length ? currentSkills : ['Problem Solving', 'Python'],
    missingSkills: ['System Architecture', 'CI/CD Automation', 'Cloud Deployment'],
    recommendedLearning: ['Complete hands-on projects with public Git history', 'Practice mock interviews weekly'],
    projectRecommendations: [
      {
        title: `Full-featured ${targetCareer} Capstone`,
        description: 'Solve a real-world problem with clear input/output and documentation.',
        impact: 'Proves autonomy and production-readiness to hiring managers.'
      }
    ],
    interviewTopics: ['Core Language Internals', 'System Reliability', 'Behavioral STAR Scenarios'],
    marketOutlook: `Demand remains robust for candidates who can demonstrate practical implementation skills and clean code architecture in ${targetCareer}.`
  };
}
