import { Career } from "@/types";

export const CAREERS: Career[] = [
  {
    id: "aiml-engineer",
    name: "AI/ML Engineer",
    description: "Build machine learning systems and AI applications.",
    match: 92,
    requiredSkills: ["Python", "Machine Learning", "Deep Learning", "SQL", "MLOps", "Git", "Linux"],
    recommendedSkills: ["PyTorch", "TensorFlow", "AWS", "Docker", "Kubernetes", "Spark"],
    responsibilities: [
      "Design and implement ML models",
      "Optimize model performance",
      "Deploy ML systems to production",
      "Monitor and maintain ML pipelines",
      "Collaborate with data scientists"
    ],
    roadmap: [
      "Python & Mathematics",
      "Machine Learning Fundamentals",
      "Deep Learning",
      "Build 3 ML Projects",
      "MLOps & Deployment",
      "Interview Preparation",
      "Internship Applications",
      "Job Applications"
    ],
    portfolioProjectIdeas: [
      "Image Classification using CNN",
      "Sentiment Analysis NLP",
      "Recommendation System",
      "Time Series Forecasting",
      "Anomaly Detection System"
    ],
    interviewTopics: [
      "Overfitting and underfitting",
      "Gradient descent optimization",
      "Cross-validation techniques",
      "Feature engineering",
      "Model evaluation metrics",
      "Big data processing"
    ],
    resources: [
      "Fast.ai Deep Learning",
      "Andrew Ng's ML Course",
      "Kaggle Competitions",
      "Papers with Code",
      "MLOps.community"
    ]
  },
  {
    id: "ml-engineer",
    name: "Machine Learning Engineer",
    description: "Specialize in production ML systems at scale.",
    match: 88,
    requiredSkills: ["Python", "Machine Learning", "SQL", "Systems Design", "Cloud Platforms", "Git"],
    recommendedSkills: ["Scala", "Java", "Spark", "Kubernetes", "AWS", "GCP"],
    responsibilities: [
      "Build scalable ML pipelines",
      "Design distributed systems",
      "Implement ML solutions",
      "Optimize performance at scale",
      "Maintain ML infrastructure"
    ],
    roadmap: [
      "Python & SQL",
      "Machine Learning Concepts",
      "Distributed Systems",
      "Big Data Tools (Spark, Hadoop)",
      "Cloud Platforms",
      "System Design",
      "Internship Focus",
      "Job Applications"
    ],
    portfolioProjectIdeas: [
      "Distributed ML Pipeline",
      "Real-time Recommendation Engine",
      "Large-scale Data Processing",
      "Model Serving System",
      "Feature Store Implementation"
    ],
    interviewTopics: [
      "System design for ML",
      "Scalable data processing",
      "Model serving strategies",
      "Data pipeline design",
      "Performance optimization",
      "Distributed training"
    ],
    resources: [
      "Designing Machine Learning Systems",
      "System Design Primer",
      "DataTalks.Club",
      "Spark Tuning Guide",
      "Cloud Provider Docs"
    ]
  },
  {
    id: "data-scientist",
    name: "Data Scientist",
    description: "Analyze data and build predictive models to drive business decisions.",
    match: 86,
    requiredSkills: ["Python", "Statistics", "SQL", "Machine Learning", "Data Visualization", "Business Acumen"],
    recommendedSkills: ["R", "Tableau", "Power BI", "Spark", "Experimentation Design"],
    responsibilities: [
      "Analyze complex datasets",
      "Build predictive models",
      "Design experiments",
      "Communicate insights",
      "Drive business decisions"
    ],
    roadmap: [
      "Python & Statistics",
      "SQL & Data Analysis",
      "Machine Learning",
      "Data Visualization",
      "A/B Testing & Experimentation",
      "Business Case Studies",
      "Portfolio Projects",
      "Internships & Jobs"
    ],
    portfolioProjectIdeas: [
      "Predictive Analytics Project",
      "A/B Testing Case Study",
      "Customer Segmentation Analysis",
      "Churn Prediction Model",
      "Market Analysis Report"
    ],
    interviewTopics: [
      "Statistical hypothesis testing",
      "A/B testing design",
      "Model evaluation metrics",
      "Data exploration techniques",
      "Business problem solving",
      "Experimentation design"
    ],
    resources: [
      "StatQuest Videos",
      "Introduction to Statistical Learning",
      "Coursera: Data Science",
      "Medium Analytics Articles",
      "Kaggle Datasets"
    ]
  },
  {
    id: "data-analyst",
    name: "Data Analyst",
    description: "Transform raw data into actionable business insights.",
    match: 81,
    requiredSkills: ["SQL", "Excel", "Python", "Power BI", "Statistics", "Communication"],
    recommendedSkills: ["Tableau", "R", "Analytics Platforms", "Business Intelligence"],
    responsibilities: [
      "Query and analyze data",
      "Create dashboards",
      "Generate reports",
      "Identify trends",
      "Support decision making"
    ],
    roadmap: [
      "Excel & SQL Mastery",
      "Statistics Fundamentals",
      "Power BI / Tableau",
      "Python for Analytics",
      "Analytics Projects",
      "Dashboard Creation",
      "Portfolio Building",
      "Job & Internship Search"
    ],
    portfolioProjectIdeas: [
      "Sales Analytics Dashboard",
      "Customer Analytics Report",
      "Trend Analysis Project",
      "Performance Metrics Dashboard",
      "Business Intelligence Report"
    ],
    interviewTopics: [
      "SQL query optimization",
      "Statistical analysis",
      "Dashboard design",
      "Data storytelling",
      "Business metrics",
      "Excel advanced functions"
    ],
    resources: [
      "Mode SQL Tutorial",
      "Tableau Public Gallery",
      "Google Analytics Academy",
      "Excel Training",
      "Analytics Vidhya"
    ]
  },
  {
    id: "software-engineer",
    name: "Software Engineer",
    description: "Build scalable and reliable software systems.",
    match: 78,
    requiredSkills: ["Programming Languages", "Data Structures", "Algorithms", "System Design", "Git", "Cloud Platforms"],
    recommendedSkills: ["Microservices", "Databases", "Testing", "DevOps", "CI/CD"],
    responsibilities: [
      "Write clean code",
      "Design systems",
      "Debug issues",
      "Review code",
      "Deploy applications"
    ],
    roadmap: [
      "Data Structures & Algorithms",
      "Programming Language Mastery",
      "Web Development Basics",
      "Advanced System Design",
      "Build 3+ Projects",
      "API Design",
      "Internship Search",
      "Interview Preparation"
    ],
    portfolioProjectIdeas: [
      "Full Stack Web Application",
      "REST API Backend",
      "Microservices Project",
      "Mobile Application",
      "Real-time Chat System"
    ],
    interviewTopics: [
      "Data structures",
      "Algorithm complexity",
      "System design",
      "API design",
      "Database design",
      "Problem solving"
    ],
    resources: [
      "LeetCode",
      "System Design Primer",
      "Clean Code Book",
      "Design Patterns",
      "CS50 Course"
    ]
  },
  {
    id: "cloud-engineer",
    name: "Cloud Engineer",
    description: "Design and manage cloud infrastructure and services.",
    match: 76,
    requiredSkills: ["Linux", "Cloud Platforms", "Infrastructure as Code", "Networking", "Security", "Containerization"],
    recommendedSkills: ["Kubernetes", "Terraform", "Python", "CI/CD", "Monitoring"],
    responsibilities: [
      "Design cloud architecture",
      "Manage cloud resources",
      "Ensure security",
      "Optimize costs",
      "Implement CI/CD pipelines"
    ],
    roadmap: [
      "Linux & Networking Basics",
      "Choose Cloud Platform (AWS/GCP/Azure)",
      "Cloud Certification Track",
      "Infrastructure as Code",
      "Container Technologies",
      "Kubernetes Fundamentals",
      "Portfolio Projects",
      "Internship & Jobs"
    ],
    portfolioProjectIdeas: [
      "Multi-tier Cloud Application",
      "Infrastructure as Code Project",
      "Kubernetes Deployment",
      "CI/CD Pipeline",
      "Cloud Cost Optimization"
    ],
    interviewTopics: [
      "Cloud architecture",
      "Networking & Security",
      "Scaling & Performance",
      "Cost optimization",
      "Infrastructure as Code",
      "Container orchestration"
    ],
    resources: [
      "Cloud Certifications",
      "Terraform Docs",
      "Kubernetes Documentation",
      "Linux Academy",
      "A Cloud Guru"
    ]
  },
  {
    id: "product-analyst",
    name: "Product Analyst",
    description: "Use data to drive product development and strategy.",
    match: 75,
    requiredSkills: ["SQL", "Analytics", "Product Thinking", "Communication", "A/B Testing", "Excel"],
    recommendedSkills: ["Python", "Statistics", "Business Intelligence", "User Research"],
    responsibilities: [
      "Define metrics",
      "Run experiments",
      "Analyze user behavior",
      "Support product decisions",
      "Monitor product health"
    ],
    roadmap: [
      "Product Fundamentals",
      "SQL & Analytics",
      "A/B Testing & Experimentation",
      "Metrics & KPIs",
      "Case Study Projects",
      "Product Thinking",
      "Portfolio Building",
      "Internship Search"
    ],
    portfolioProjectIdeas: [
      "Product Analytics Case Study",
      "User Funnel Analysis",
      "A/B Test Design & Analysis",
      "Product Metrics Dashboard",
      "User Behavior Report"
    ],
    interviewTopics: [
      "A/B testing methodology",
      "Product metrics",
      "User behavior analysis",
      "Business problem solving",
      "Experimentation design",
      "Data storytelling"
    ],
    resources: [
      "Reforge: Product Analytics",
      "DataTalks.Club",
      "Amplitude Blog",
      "Product Thinking Guide",
      "Mixpanel Docs"
    ]
  }
];

export const INTERNSHIP_DATA = [
  {
    id: "intern-1",
    title: "AI/ML Intern",
    company: "Nova Labs",
    location: "Remote",
    type: "internship" as const,
    salary: "₹15k–25k/mo",
    skills: ["AI", "Python", "ML"],
    description: "Work on cutting-edge AI projects with mentorship from ML engineers.",
    applicationUrl: "https://example.com/apply"
  },
  {
    id: "intern-2",
    title: "Machine Learning Intern",
    company: "DataForge",
    location: "Bengaluru",
    type: "internship" as const,
    salary: "₹20k–30k/mo",
    skills: ["Python", "ML", "SQL"],
    description: "Develop machine learning models for real-world data challenges.",
    applicationUrl: "https://example.com/apply"
  },
  {
    id: "intern-3",
    title: "Data Science Intern",
    company: "InsightWorks",
    location: "Hyderabad",
    type: "internship" as const,
    salary: "₹18k–28k/mo",
    skills: ["Python", "Statistics"],
    description: "Analyze complex datasets and build predictive models.",
    applicationUrl: "https://example.com/apply"
  },
  {
    id: "intern-4",
    title: "AI Research Intern",
    company: "FutureMind",
    location: "Remote",
    type: "internship" as const,
    salary: "₹20k–35k/mo",
    skills: ["Deep Learning", "Research"],
    description: "Contribute to cutting-edge AI research projects.",
    applicationUrl: "https://example.com/apply"
  },
  {
    id: "intern-5",
    title: "Data Analyst Intern",
    company: "MetricFlow",
    location: "Pune",
    type: "internship" as const,
    salary: "₹12k–20k/mo",
    skills: ["SQL", "Power BI"],
    description: "Generate insights from business data using analytics tools.",
    applicationUrl: "https://example.com/apply"
  }
];

export const JOB_DATA = [
  {
    id: "job-1",
    title: "Junior ML Engineer",
    company: "TechNova",
    location: "Bengaluru",
    type: "job" as const,
    salary: "₹8L–12L/yr",
    skills: ["Python", "ML"],
    description: "Build machine learning systems for production use.",
    applicationUrl: "https://example.com/apply"
  },
  {
    id: "job-2",
    title: "AI Engineer",
    company: "BrightScale",
    location: "Hyderabad",
    type: "job" as const,
    salary: "₹10L–15L/yr",
    skills: ["Python", "Deep Learning"],
    description: "Develop AI solutions for enterprise clients.",
    applicationUrl: "https://example.com/apply"
  },
  {
    id: "job-3",
    title: "Data Scientist",
    company: "Analytix",
    location: "Pune",
    type: "job" as const,
    salary: "₹9L–14L/yr",
    skills: ["Python", "SQL", "ML"],
    description: "Drive data-driven decision making across the organization.",
    applicationUrl: "https://example.com/apply"
  },
  {
    id: "job-4",
    title: "Associate Data Analyst",
    company: "CloudPeak",
    location: "Remote",
    type: "job" as const,
    salary: "₹5L–8L/yr",
    skills: ["SQL", "Excel", "Power BI"],
    description: "Analyze business metrics and create reporting dashboards.",
    applicationUrl: "https://example.com/apply"
  },
  {
    id: "job-5",
    title: "Product Analyst",
    company: "LaunchLabs",
    location: "Delhi NCR",
    type: "job" as const,
    salary: "₹6L–10L/yr",
    skills: ["SQL", "Analytics"],
    description: "Use data to optimize product features and user experience.",
    applicationUrl: "https://example.com/apply"
  }
];

export const RESOURCES_DATA = [
  {
    id: "res-1",
    category: "Resume",
    title: "5 Resume Mistakes Students Make",
    summary: "Avoid weak summaries, generic bullets, poor formatting, missing results and irrelevant information.",
    content: `A strong student resume is focused, measurable and easy to scan.

Key principles:
• Start with a clear target role
• Use action verbs to describe your work
• Quantify projects and results where possible
• Keep formatting consistent and professional
• Remove information that does not support your target role
• Keep it to one page as a student
• Include metrics: numbers, percentages, impact

Common mistakes to avoid:
1. Weak summary: "Hardworking student seeking to learn" → "AI/ML student with 3 projects in Python and ML"
2. Generic bullets: "Helped with the project" → "Built CNN model achieving 94% accuracy on image classification"
3. Poor formatting: Inconsistent fonts, spacing, margins
4. Missing results: "Developed a website" → "Built e-commerce website using React that increased sales by 25%"
5. Irrelevant info: Personal interests that don't support your target role

Action items:
• Update your summary to be specific and role-targeted
• Review each bullet: does it have an impact or metric?
• Ensure consistent formatting
• Get feedback from 2 people
• Test your resume in an ATS scanner
`
  },
  {
    id: "res-2",
    category: "AI + Resume",
    title: "5 AI Prompts to Improve Your Resume",
    summary: "Use AI as a career co-pilot while keeping your own voice.",
    content: `AI can supercharge your resume editing. Try these prompts with tools like ChatGPT:

1. ATS Optimization
Prompt: "Review this resume bullet for ATS compatibility and suggest improvements: [bullet]"
Purpose: Ensure key skills and keywords are visible to automated systems

2. Impact Reframing
Prompt: "Convert this task into an impact-focused bullet with metrics: [task description]"
Purpose: Transform generic descriptions into powerful achievements

3. Keyword Analysis
Prompt: "What keywords are missing from my resume for [target role]? Show me a sample bullet."
Purpose: Identify high-value skills you haven't highlighted

4. Clarity & Conciseness
Prompt: "Rewrite this bullet to be clearer and punchier in one sentence: [bullet]"
Purpose: Make your achievements easier to read and remember

5. Interview Questions
Prompt: "What questions might an interviewer ask based on this resume bullet? [bullet]"
Purpose: Prepare for follow-up questions during interviews

Pro tips:
• Edit AI suggestions to match your voice
• Focus on accuracy and honesty
• Use AI for brainstorming, not the final product
• Combine 2–3 AI suggestions into your best version
• Always verify metrics and claims
`
  },
  {
    id: "res-3",
    category: "LinkedIn",
    title: "How to Build a Strong LinkedIn Profile",
    summary: "A practical checklist for students and fresh graduates.",
    content: `Your LinkedIn profile is your professional digital presence. Here's how to build one that gets noticed:

Essential elements:

1. Professional Photo
• Clear headshot with neutral background
• Professional clothing
• Good lighting
• Smiling and friendly expression

2. Specific Headline
Bad: "Student at XYZ University"
Good: "AI/ML Student | Python Developer | Building ML Projects"
Better: "AI/ML Engineer in training | Building recommendation systems | Open to internships"

3. Compelling About Section
Include:
• Your target role
• 2–3 key skills
• Your unique angle (what makes you different)
• A call to action
• Link to your GitHub or portfolio

Example: "I'm an AI/ML student building practical machine learning skills. My focus: computer vision and NLP projects. Actively seeking internship opportunities to apply my skills to real-world problems. Let's connect: [GitHub]"

4. Featured Work
• Pin your 3 best projects
• Link to GitHub repos
• Include project descriptions
• Show impact and results

5. Skills Section
• Add 15–20 relevant skills
• Prioritize by target role
• Get endorsements from peers and mentors

6. Experience
• Add internships, projects, volunteer work
• Use impact-focused descriptions
• Quantify achievements

7. Education
• Add your degree, university, graduation date
• Add relevant certifications and courses
• Include achievements

Action plan:
□ Upload professional photo
□ Rewrite headline to match target role
□ Draft compelling About section
□ Feature your 3 best projects
□ Add 15+ skills with endorsements
□ Add all relevant experience
□ Complete education section
□ Ask 2 people to review your profile
□ Join 5 AI/ML groups
□ Post 1 original thought this week
`
  },
  {
    id: "res-4",
    category: "Interview",
    title: "Interview Preparation Checklist",
    summary: "Prepare your stories, technical basics and questions.",
    content: `A structured approach to interview preparation that reduces anxiety and builds confidence.

Two weeks before:

Research
□ Company: Mission, values, recent news, culture
□ Role: Job description, required skills, team structure
□ Industry: Trends, challenges, opportunities
□ Competitors: How the company compares

Prepare STAR stories
□ Tell Me About Yourself (60 seconds)
□ Your biggest challenge and how you solved it
□ A project you're proud of
□ A time you failed and learned
□ A time you worked in a team
□ A time you had to learn something new
□ A time you showed leadership

Structure: Situation → Task → Action → Result

One week before:

Technical Preparation
□ Review data structures and algorithms
□ Review your projects in detail
□ Practice 2–3 coding problems
□ Understand your ML/Data models
□ Review your resume
□ Prepare 5 good questions to ask

Day before:

Final Review
□ Check interview format (virtual/in-person)
□ Test tech setup if virtual (camera, mic, internet)
□ Plan route and timing for in-person
□ Prepare 2 copies of resume
□ Get good sleep (7–8 hours)

Day of:

□ Dress appropriately for the role and company
□ Arrive 10–15 minutes early
□ Bring notebook and pen
□ Silence your phone
□ Eat something light
□ Deep breathing: calm and positive mindset

During interview:

□ Make eye contact and smile
□ Listen carefully to questions
□ Pause before answering (don't rush)
□ Use STAR method for behavioral questions
□ Show enthusiasm for the role and company
□ Ask thoughtful questions
□ Get business cards or contact info

Questions to ask:

□ What does a typical day look like?
□ How does the team measure success?
□ What's the biggest challenge in this role?
□ How does the team stay connected?
□ What's the next step in the process?

After interview:

□ Send thank you email within 24 hours
□ Reiterate interest in the role
□ Mention 1–2 specific points from conversation
□ Wait patiently for follow-up
□ Continue applying to other roles
`
  },
  {
    id: "res-5",
    category: "Internships",
    title: "How to Find the Right Internship",
    summary: "Choose opportunities that match your learning goals.",
    content: `Finding the right internship matters more than just finding any internship.

Selection criteria:

1. Skill Match
□ Does the role require skills you want to learn?
□ Are your current skills sufficient to contribute?
□ Will you gain hands-on experience in your target area?

2. Mentorship & Learning
□ Will you have a mentor or manager guiding you?
□ Are there learning resources (courses, training)?
□ Do senior engineers review your work?
□ Will you present or demo your work?

3. Project Exposure
□ Will you work on real projects with real impact?
□ Will your work be used in production?
□ Is the project relevant to your career goal?
□ Will you have something for your portfolio?

4. Culture & Team
□ Is the team collaborative?
□ Do interns get included in meetings and discussions?
□ Is the company culture a good fit?
□ Will you make connections for future opportunities?

5. Logistics
□ Location (remote, relocation support)?
□ Duration (3 months, 6 months)?
□ Timeline (summer, full-time, part-time)?
□ Stipend or compensation?
□ Housing support if needed?

Red flags:

× You'll be doing only busywork or data entry
× No mentor or clear project definition
× Interns are treated as outsiders
× No feedback or growth opportunities
× Unclear expectations or requirements
× Toxic team dynamics

Application strategy:

1. Make a list
→ 20 companies you admire
→ 10 companies in your target field
→ 5 companies you really want

2. Research thoroughly
→ Read reviews on Glassdoor
→ Check their engineering blog
→ Look at their GitHub
→ Follow their social media

3. Customize each application
→ Personalize your cover letter
→ Match the job description
→ Show enthusiasm for the specific role
→ Highlight relevant projects

4. Timing
→ Apply 3–4 months before the internship start date
→ Most companies hire 3–4 months in advance
→ Don't wait until the last minute

5. Follow up
→ After 1 week, send a polite follow-up email
→ Show continued interest
→ Mention any new relevant experience

Evaluation framework:

For each offer, score 1–5:
□ Skill development (weight: 3x)
□ Mentorship quality (weight: 2x)
□ Project impact (weight: 2x)
□ Company prestige (weight: 1x)
□ Compensation (weight: 1x)
□ Culture & team (weight: 2x)

Choose the opportunity with the highest weighted score that aligns with your goals.
`
  },
  {
    id: "res-6",
    category: "Skills",
    title: "Skills Students Should Build in 2026",
    summary: "Focus on durable technical and professional skills.",
    content: `Building the right skills now sets you up for success in a rapidly changing job market.

Technical foundation (every student):

1. Programming & Problem Solving
• At least one language deeply (Python, JavaScript, etc.)
• Data structures and algorithms
• Git and version control
• Understanding of how systems work

Why: All technical roles require these fundamentals

2. Data Skills
• SQL for data querying
• Basic statistics and probability
• Reading and creating charts
• Understanding metrics and KPIs

Why: Every role increasingly involves data

3. AI Literacy
• Understanding how LLMs work
• Prompt engineering fundamentals
• When to use AI and when not to
• Ethical considerations
• Using AI tools effectively

Why: AI literacy is becoming baseline knowledge

Role-specific skills:

AI/ML Engineers:
• Machine Learning frameworks (PyTorch, TensorFlow)
• MLOps and deployment
• Deep Learning for your domain
• System design for ML

Data Scientists:
• Statistical analysis
• Experimentation design (A/B testing)
• Data visualization
• SQL and databases

Software Engineers:
• Web frameworks or mobile development
• API design
• Database design
• System architecture

Product Analysts:
• Advanced SQL
• Analytics tools (Tableau, Power BI)
• Experimentation methodology
• Product thinking

Professional skills (equally important):

1. Communication
• Write clear code with documentation
• Explain technical concepts simply
• Present ideas effectively
• Listen actively

2. Collaboration
• Work in teams
• Code review and feedback
• Pair programming
• Asynchronous communication

3. Learning Agility
• Learn new tools quickly
• Stay current with industry trends
• Adapt to changing technologies
• Self-directed learning

4. Problem Solving
• Break complex problems down
• Think systematically
• Iterate and improve
• Ask good questions

How to build these skills:

Projects (40%)
• Build 3–4 substantial projects
• Deploy or ship real work
• Solve real problems
• Get feedback and iterate

Courses (20%)
• Follow 1–2 structured courses
• Dive deep in one area
• Get expert guidance
• Certification for credibility

Reading & Writing (20%)
• Read technical blogs and papers
• Write about what you learn
• Share knowledge with others
• Stay current

Collaboration (20%)
• Contribute to open source
• Work with others on projects
• Join communities
• Get code reviews

Recommended 6-month plan:

Month 1–2: Build one project using your target skills
Month 3: Take one focused course in your field
Month 4–5: Build a second project, contributing skills learned
Month 6: Write about your journey, prepare for opportunities

Remember:
→ Depth beats breadth
→ Skills + projects beat skills alone
→ Communication + skills = faster growth
→ Build in public: share your progress
`
  }
];
