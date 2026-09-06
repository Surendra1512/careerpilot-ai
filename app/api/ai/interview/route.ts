import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

const API_KEY = process.env.GEMINI_API_KEY;

export async function POST(request: NextRequest) {
  let body: any = {};
  try {
    body = await request.json().catch(() => ({}));
    const action = body.action || 'evaluate';
    const targetCareer = body.targetCareer || 'Software Engineer';
    const interviewType = body.interviewType || 'Mixed'; // Technical, HR, Behavioral, Mixed
    const difficulty = body.difficulty || 'Medium'; // Easy, Medium, Hard

    if (action === 'generate_questions') {
      if (!API_KEY) {
        return NextResponse.json({
          questions: getLocalQuestions(targetCareer, interviewType, difficulty),
          source: 'local-demo'
        });
      }

      try {
        const genAI = new GoogleGenerativeAI(API_KEY);
        const model = genAI.getGenerativeModel({
          model: 'gemini-1.5-flash',
          generationConfig: { responseMimeType: 'application/json' }
        });

        const prompt = `Generate 5 realistic interview questions for a candidate applying as a "${targetCareer}".
Interview Type: ${interviewType} (Focus strictly on this format: Technical, HR, Behavioral, or a balanced Mix).
Difficulty Level: ${difficulty} (Adjust depth, complexity, and scrutiny accordingly).

Return a strict JSON object:
{
  "questions": [
    "Question 1 text...",
    "Question 2 text...",
    "Question 3 text...",
    "Question 4 text...",
    "Question 5 text..."
  ]
}`;

        const result = await model.generateContent(prompt);
        const parsed = JSON.parse(result.response.text());
        if (Array.isArray(parsed.questions) && parsed.questions.length > 0) {
          return NextResponse.json({ questions: parsed.questions, source: 'gemini' });
        }
      } catch (genError) {
        console.error('Question generation fallback:', genError);
      }

      return NextResponse.json({
        questions: getLocalQuestions(targetCareer, interviewType, difficulty),
        source: 'local-fallback'
      });
    }

    // Default action: Evaluate answer
    const question = body.question;
    const answer = body.answer;

    if (!question || !answer || answer.trim().length === 0) {
      return NextResponse.json(
        { error: 'Question and candidate answer are required for evaluation' },
        { status: 400 }
      );
    }

    if (!API_KEY) {
      return NextResponse.json(generateDemoEvaluation(question, answer, targetCareer, interviewType, difficulty));
    }

    const genAI = new GoogleGenerativeAI(API_KEY);
    const model = genAI.getGenerativeModel({
      model: 'gemini-1.5-flash',
      generationConfig: { responseMimeType: 'application/json' }
    });

    const prompt = buildEvaluationPrompt(question, answer, targetCareer, interviewType, difficulty);
    const result = await model.generateContent(prompt);
    const responseText = result.response.text();

    try {
      const parsed = JSON.parse(responseText);
      const validated = normalizeEvaluation(parsed, question, answer, targetCareer);
      return NextResponse.json({ ...validated, source: 'gemini' });
    } catch (parseError) {
      const jsonMatch = responseText.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        const parsed = JSON.parse(jsonMatch[0]);
        const validated = normalizeEvaluation(parsed, question, answer, targetCareer);
        return NextResponse.json({ ...validated, source: 'gemini' });
      }
      throw parseError;
    }

  } catch (error: any) {
    console.error('Interview Evaluation Error:', error?.message || error);
    return NextResponse.json(
      generateDemoEvaluation(body.question || '', body.answer || '', body.targetCareer || 'Software Engineer', body.interviewType, body.difficulty)
    );
  }
}

function buildEvaluationPrompt(question: string, answer: string, targetCareer: string, type: string, difficulty: string): string {
  return `You are a Principal Hiring Manager evaluating a mock interview candidate for a "${targetCareer}" role.
Interview Type: ${type}
Difficulty: ${difficulty}

Question Asked:
"${question}"

Candidate Answer:
"${answer}"

Evaluate their answer with high standards and constructiveness. Return a strict JSON response:
{
  "score": 0-100 integer representing technical accuracy, depth, structure (e.g. STAR method), and communication,
  "strengths": ["Key positive aspect 1", "Positive aspect 2"],
  "weaknesses": ["Area lacking detail or clarity 1", "Weakness 2"],
  "missingPoints": ["Key concept or metric that should have been mentioned 1", "Missing point 2"],
  "improvedAnswer": "A comprehensive, polished model answer incorporating proper technical terms, structure, and measurable results (2-4 paragraphs)",
  "actionableAdvice": "1-2 practical tips to apply next time this topic is raised in an interview"
}`;
}

function normalizeEvaluation(data: any, question: string, answer: string, targetCareer: string) {
  const score = typeof data.score === 'number' ? Math.min(100, Math.max(10, Math.round(data.score))) : 70;
  return {
    score,
    strengths: Array.isArray(data.strengths) && data.strengths.length > 0 ? data.strengths : ['Clear attempt to address the core prompt', 'Good conversational tone'],
    weaknesses: Array.isArray(data.weaknesses) && data.weaknesses.length > 0 ? data.weaknesses : ['Answer could include more quantitative evidence or structural framework (STAR)'],
    missingPoints: Array.isArray(data.missingPoints) && data.missingPoints.length > 0 ? data.missingPoints : ['Specific tools used', 'Quantifiable outcomes or metrics', 'Edge case consideration'],
    improvedAnswer: typeof data.improvedAnswer === 'string' && data.improvedAnswer.length > 30
      ? data.improvedAnswer
      : `In approaching this scenario as a ${targetCareer}, I first diagnose the root requirement and relevant constraints. I then apply established best practices—verifying assumptions with data and implementing an iterative solution. In my previous work, this structured methodology allowed me to reduce errors and deliver reliable results on schedule.`,
    actionableAdvice: typeof data.actionableAdvice === 'string' && data.actionableAdvice.length > 10
      ? data.actionableAdvice
      : 'Structure future answers using STAR (Situation, Task, Action, Result) and state what specific metric improved.'
  };
}

function generateDemoEvaluation(question: string, answer: string, targetCareer: string, type: string = 'Technical', difficulty: string = 'Medium') {
  const trimmed = answer.trim();
  const wordCount = trimmed.split(/\s+/).filter(Boolean).length;
  const hasNumbers = /[0-9%]+/.test(trimmed);
  const hasStarWords = /(situation|task|action|result|impact|achieved|reduced|improved|because|therefore)/i.test(trimmed);
  const hasDomainWords = /(architecture|pipeline|model|algorithm|database|system|scalable|test|debug|api)/i.test(trimmed);

  let score = 40;
  if (wordCount >= 25) score += 15;
  if (wordCount >= 60) score += 15;
  if (hasNumbers) score += 10;
  if (hasStarWords) score += 10;
  if (hasDomainWords) score += 10;
  score = Math.min(95, Math.max(35, score));

  return {
    source: 'local-demo',
    score,
    strengths: [
      wordCount >= 30 ? 'Provided sufficient context and explanation' : 'Directly touched on the question subject',
      hasStarWords ? 'Attempted to explain cause, effect, and methodology' : 'Communicated ideas straightforwardly',
      hasNumbers ? 'Included specific figures or metrics to substantiate claims' : 'Clear professional demeanor'
    ],
    weaknesses: [
      wordCount < 40 ? 'Answer is concise; expand with concrete technical examples' : 'Could tighten delivery to focus more on personal contribution',
      !hasNumbers ? 'Lacks quantifiable outcomes (percentages, runtime figures, volume of data, team size)' : 'Could delve deeper into trade-offs and alternative approaches considered',
      !hasStarWords ? 'Did not clearly follow the STAR (Situation, Task, Action, Result) framework' : 'Ensure the "Result" highlights lasting positive engineering impact'
    ],
    missingPoints: [
      `Specific tools/libraries appropriate for ${targetCareer}`,
      'Discussion of edge cases, scalability limitations, or failure modes',
      'The business or operational impact of the final outcome'
    ],
    improvedAnswer: `When addressing "${question || 'this technical problem'}", I structure my response using the STAR method:\n\n**Situation & Task**: In a recent project relevant to ${targetCareer}, we encountered a challenge where performance and reliability were paramount.\n\n**Action**: I designed a clean architecture by isolating key components, automating unit tests, and verifying data flows under simulated peak loads.\n\n**Result**: This reduced processing latency by over 30% and enabled our team to deploy updates with zero downtime.`,
    actionableAdvice: `End your answer with a definitive summary sentence highlighting the key lesson or quantifiable impact for a ${targetCareer} team.`
  };
}

function getLocalQuestions(role: string, type: string, difficulty: string): string[] {
  const bank: Record<string, string[]> = {
    'AI / ML Engineer': [
      'How would you handle an imbalanced classification dataset where the positive class is less than 2%?',
      'Walk me through how you evaluate and prevent overfitting in deep neural networks.',
      'Explain the difference between L1 and L2 regularization and their effect on model weights.',
      'Describe an end-to-end machine learning project you deployed into production.',
      'How do you monitor model drift and data distribution shift post-deployment?'
    ],
    'Data Scientist': [
      'How do you determine whether an A/B test has reached statistical significance?',
      'Explain the bias-variance tradeoff to an executive or non-technical stakeholder.',
      'When would you choose Random Forests over XGBoost or Logistic Regression?',
      'Describe how you clean and impute missing data in high-dimensional feature sets.',
      'Tell me about a time your data insights contradicted the team\'s initial hypothesis.'
    ],
    'Data Analyst': [
      'Write out the conceptual difference between WHERE and HAVING clauses in SQL with an example.',
      'How do you design an executive dashboard in Power BI or Tableau to prevent information overload?',
      'Walk me through how you validate data integrity when merging multiple raw sources.',
      'What statistical metrics do you examine first when doing exploratory data analysis (EDA)?',
      'Describe a situation where your analytical finding directly drove a business decision.'
    ],
    'Software Engineer': [
      'How do you choose between an SQL and a NoSQL database for a new microservice?',
      'Explain how the event loop works in asynchronous programming environments.',
      'Walk me through your systematic approach to debugging a memory leak or sudden latency spike in production.',
      'Describe how you design RESTful APIs to be idempotent and backwards-compatible.',
      'Tell me about a time you had a technical disagreement with a teammate and how you resolved it.'
    ]
  };

  const defaultQuestions = [
    'Tell me about a challenging technical project you built from scratch.',
    'Describe a situation where a project fell behind schedule and what steps you took.',
    'How do you approach learning and adopting a complex new library or framework?',
    'Explain a time you identified a bug that was difficult to reproduce.',
    'Why are you excited about this specific role and how does your background prepare you?'
  ];

  return bank[role] || defaultQuestions;
}
