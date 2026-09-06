import { NextRequest, NextResponse } from 'next/server';
import { getGeminiModel } from '@/lib/gemini';

export async function POST(request: NextRequest) {
  let message = '';
  let context: any = {};

  try {
    const body = await request.json().catch(() => ({}));
    message = body.message?.trim() || '';
    context = body.context || {};

    if (!message) {
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 }
      );
    }

    const model = getGeminiModel({
      systemInstruction: buildSystemPrompt(context),
    });

    if (!model) {
      return NextResponse.json({
        response: generateLocalResponse(message, context),
        source: 'local-fallback',
        message: 'AI service is temporarily operating in local fallback mode.'
      });
    }

    // Gemini requires chat history to start with a user message.
    // The UI may include its initial assistant greeting, so normalize the
    // history before passing it to startChat. Also keep the current message
    // out of history because it is sent separately with sendMessage().
    const rawHistory = Array.isArray(context?.history) ? context.history : [];
    const mappedHistory = rawHistory
      .map((h: any) => ({
        role: h.role === 'user' ? 'user' : 'model',
        parts: [{ text: String(h.text || '').trim() }]
      }))
      .filter((h: any) => h.parts[0].text.length > 0);

    const firstUserIndex = mappedHistory.findIndex((h: any) => h.role === 'user');
    const history = firstUserIndex >= 0
      ? mappedHistory.slice(firstUserIndex)
      : [];

    // A Gemini chat history must not end with the same user message that we
    // are about to send. This also protects against duplicate messages from
    // clients that optimistically append the current message to history.
    const last = history[history.length - 1];
    if (last?.role === 'user' && last.parts[0].text === message) {
      history.pop();
    }

    const chat = model.startChat({
      history: history.slice(-10), // keep recent context
    });

    const result = await chat.sendMessage(message);
    const response = result.response.text();

    return NextResponse.json({
      response,
      source: 'gemini'
    });

  } catch (error: any) {
    console.error('AI Chat Route Error:', error?.message || error);
    return NextResponse.json({
      response: generateLocalResponse(message, context),
      source: 'local-fallback',
      message: 'AI service is temporarily operating in local fallback mode.'
    });
  }
}

function buildSystemPrompt(context: any): string {
  return `You are CareerPilot AI, an elite, empowering, highly actionable career mentor and strategist for college students and fresh graduates.

Brand identity: CareerPilot AI — "Navigate Your Career. Smarter."

User's Real-time Profile & Career Context:
- Target Career: ${context?.targetCareer || 'Technology / Engineering'}
- Current Skills: ${Array.isArray(context?.skills) ? context.skills.join(', ') : context?.skills || 'Not specified'}
- Degree & Year: ${context?.degree || 'Undergraduate'} ${context?.year ? `(${context.year})` : ''}
- Experience: ${context?.experience || 'Early career / student'}
- Career Goal: ${context?.goal || 'Build career readiness and secure opportunities'}
- Resume Summary: ${context?.resumeSummary || 'Not provided'}
- Skill Gap Items: ${Array.isArray(context?.skillGaps) ? context.skillGaps.join(', ') : 'Not calculated yet'}
- Roadmap Progress: ${context?.roadmapCompleted !== undefined ? `${context.roadmapCompleted} milestones completed` : 'In progress'}

Guidelines:
1. Always tailor your advice specifically to their target career and current skills.
2. Structure answers with clear bullet points, actionable steps, and realistic guidance for college students.
3. Keep tone encouraging, professional, and practical.
4. If they ask about resumes, interviews, or roadmaps, give tangible examples and point them to CareerPilot AI modules where appropriate.`;
}

function generateLocalResponse(message: string, context: any): string {
  const lower = message.toLowerCase();
  const targetCareer = context?.targetCareer || 'your target career';
  const skills = Array.isArray(context?.skills) ? context.skills : ['Python', 'Problem Solving'];
  const gaps = Array.isArray(context?.skillGaps) ? context.skillGaps : [];

  if (lower.includes('resume')) {
    return `[Demo Mode] **High-Impact Resume Improvements for ${targetCareer}:**

1. **Quantify Your Achievements**: Replace vague bullets with metrics: *"Engineered a data pipeline that improved ingestion speed by 35%"*.
2. **Target Core Keywords**: ATS scanners look for skills like ${skills.slice(0, 3).join(', ')}. Ensure they are explicitly highlighted in your projects.
3. **Use the STAR Formula**: Situation, Task, Action, Result for every experience and project.
4. **Keep It to One Page**: Recruiters spend an average of 6 seconds reviewing student resumes.

*Use the CareerPilot **Resume** module to trigger an automated scoring audit and ATS keyword check.*`;
  }

  if (lower.includes('linkedin')) {
    return `[Demo Mode] **LinkedIn Optimization Strategy for ${targetCareer}:**

1. **Headline**: Combine your target role with your top technical skills: *"${targetCareer} Aspirant | ${skills.slice(0, 2).join(' • ')} | Building Scalable Solutions"*.
2. **About Section**: Tell your story in 3 paragraphs: your passion, projects you've shipped, and what value you're eager to bring.
3. **Featured Section**: Pin your GitHub repository, live demo links, or certifications.
4. **Active Engagement**: Share concise technical takeaways or project updates weekly to gain recruiter visibility.

*Check the **LinkedIn Optimizer** module to generate customized headline and About copy.*`;
  }

  if (lower.includes('interview')) {
    return `[Demo Mode] **Interview Preparation Roadmap for ${targetCareer}:**

1. **Technical Foundations**: Review core data structures, algorithms, and domain concepts specific to ${targetCareer}.
2. **Project Deep Dives**: Be ready to explain the architecture, trade-offs, and failure recoveries of your top 2 portfolio projects.
3. **Behavioral Questions (STAR Method)**: Prepare 4 stories covering leadership, resolving technical disagreement, overcoming roadblocks, and meeting tight deadlines.
4. **Mock Practice**: Speak your answers out loud under timed conditions.

*Head over to the **Interview Prep** module to practice targeted questions with automated evaluation.*`;
  }

  if (lower.includes('skill') || lower.includes('learn') || lower.includes('gap')) {
    return `[Demo Mode] **Strategic Learning Plan for ${targetCareer}:**

- **Primary Skills Identified**: ${skills.join(', ') || 'Core fundamentals'}.
${gaps.length > 0 ? `- **Priority Gaps to Close**: ${gaps.slice(0, 3).join(', ')}.` : `- **Recommended Next Areas**: System design, end-to-end project deployment, and cloud integration.`}
- **30-Day Focus**: Spend 45 minutes daily building a single, tangible project that demonstrates the exact skills companies hire for.
- **Evidence Over Theory**: Commit your code publicly to GitHub with a clean README and live demo link.

*Visit the **Skill Gap** module to toggle owned competencies and prioritize your next moves.*`;
  }

  if (lower.includes('roadmap') || lower.includes('plan') || lower.includes('step')) {
    return `[Demo Mode] **Your Step-by-Step Pathway to ${targetCareer}:**

1. **Phase 1 (Foundations)**: Master core languages, version control with Git, and fundamentals.
2. **Phase 2 (Practical Application)**: Build 2 end-to-end projects solving non-trivial problems.
3. **Phase 3 (Professional Profile)**: Polish your resume, optimize LinkedIn, and write case studies for your projects.
4. **Phase 4 (Applications & Interviews)**: Apply to internships and junior roles while doing weekly mock interviews.

*Check out the **Career Roadmap** module to track your milestones and progress.*`;
  }

  return `[Demo Mode] **CareerPilot AI Guidance:**

I am here to guide you toward landing a role as a **${targetCareer}**. 

Here is what we can do together:
- **Resume Audit**: Identify missing keywords and ATS formatting gaps.
- **Skill Strategy**: Pinpoint what skills you need next.
- **Interview Coaching**: Practice technical and behavioral questions.
- **Application Focus**: Discover internships and job opportunities aligned with your current readiness.

What specific challenge would you like to tackle right now?`;
}
