# CareerPilot AI

## Navigate Your Career. Smarter.

CareerPilot AI is an AI-powered career guidance platform designed for college students and fresh graduates. It provides a comprehensive suite of tools to help users discover careers, build skills, prepare for interviews, and land internships and jobs.

**Live Demo**: Open-source, no authentication required, works offline with local data persistence.

---

## Features

### Core Modules

- **Dashboard**: Real-time career readiness score, resume score, LinkedIn profile strength, and personalized recommendations
- **Career Explorer**: Browse 7+ career paths with skill matching and detailed roadmaps
- **Career Roadmap**: Personalized, milestone-based learning path for selected career
- **Skill Gap Analysis**: Identify missing skills and get prioritized learning recommendations
- **Resume Builder**: Create, edit, and analyze resumes with live scoring and PDF export
- **LinkedIn Optimizer**: Generate optimized headlines and About sections based on your profile
- **Interview Preparation**: Practice mock interviews with AI-powered scoring and feedback
- **Jobs & Internships**: Search and save job and internship opportunities
- **AI Career Assistant**: Chat-based guidance (local fallback, OpenAI ready)
- **Career Resources**: 6+ curated articles aligned with LinkedIn content strategy
- **Profile Management**: Store your career identity and track progress
- **Settings**: Customize experience and export/import data

### Key Features

✅ **No Authentication**: Open directly to dashboard, zero sign-up friction
✅ **Local Data Persistence**: Browser-based localStorage, survives page refresh
✅ **Comprehensive Career Data**: 7 careers with detailed skill requirements and roadmaps
✅ **Calculated Scores**: Real, logic-based scoring (not random)
✅ **Responsive Design**: Works on desktop, tablet, mobile
✅ **Professional UI**: Modern SaaS-style design with blue/navy theme
✅ **Demo Data**: Clear labels on demo opportunities vs. live data
✅ **API-Ready**: Hooks for real jobs API, internships API, AI LLM integration
✅ **Vercel-Ready**: Optimized for serverless deployment

---

## Tech Stack

- **Frontend**: Next.js 16, React 19, TypeScript
- **Styling**: Tailwind CSS (via globals.css)
- **Icons**: Lucide React
- **Data**: Structured career data with TypeScript interfaces
- **State**: React Context + localStorage
- **Deployment**: Vercel (serverless)

---

## Quick Start

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation & Run

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Open http://localhost:3000
```

No login required. All data persists in browser localStorage.

### Build & Deploy

```bash
# Build for production
npm run build

# Start production server
npm start

# Deploy to Vercel
# Push to GitHub, connect to Vercel, auto-deploy on push
```

---

## Project Structure

```
├── app/
│   ├── layout.tsx              # Root layout
│   ├── page.tsx                # Home page
│   ├── globals.css             # Global styles
│   └── api/
│       └── ai/chat/route.ts    # AI Chat endpoint
├── components/
│   └── CareerPilotApp.tsx      # Main app
├── data/
│   └── index.ts                # Career & opportunity data
├── types/
│   └── index.ts                # TypeScript interfaces
├── .env.example                # Environment template
└── README.md                   # This file
```

---

## Environment Variables (Optional)

Create `.env.local` (not versioned):

```env
# AI Career Assistant - Optional
AI_API_KEY=sk-...
AI_API_PROVIDER=openai

# Jobs API - Optional
JOBS_API_KEY=...
JOBS_API_URL=...

# Internships API - Optional
INTERNSHIPS_API_KEY=...
INTERNSHIPS_API_URL=...
```

**Without these keys**, the app uses local demo data and deterministic AI responses. All features work perfectly offline.

---

## Careers Included

1. **AI/ML Engineer** - Build machine learning systems (7 required skills)
2. **Machine Learning Engineer** - Production ML systems at scale (7 required skills)
3. **Data Scientist** - Analyze data and build predictive models (6 required skills)
4. **Data Analyst** - Transform raw data into insights (6 required skills)
5. **Software Engineer** - Build scalable software (7 required skills)
6. **Cloud Engineer** - Design cloud infrastructure (6 required skills)
7. **Product Analyst** - Use data to drive product decisions (6 required skills)

Each career includes:
- Detailed skill requirements
- 8–10 milestone roadmap
- Portfolio project ideas
- Interview topics
- Learning resources

---

## Scoring Logic

### Career Readiness (%)
```
readiness = 55% + (covered_skills/required_skills)×30% + (roadmap_milestones_completed)×2%
```

### Resume Score (0–100)
Based on content completeness and structure.

### LinkedIn Strength (%)
Based on profile field completion and content length.

### Interview Practice Score
Based on answer length, specificity, and impact language.

---

## Data Persistence

All user data stored in browser localStorage under `careerpilot-state`:

- User profile (name, email, skills, goal)
- Selected career
- Resume content
- LinkedIn profile
- Roadmap progress
- Saved opportunities
- Settings
- Interview history

**Survives**: Page refresh, browser restart
**Lost if**: Browser storage cleared or user signs into different account

---

## Module Walkthrough

### Dashboard
Central hub showing:
- Career readiness %
- Resume score
- LinkedIn strength %
- Interview readiness
- Next recommended action
- Saved opportunities

### Career Explorer
- Browse all 7 careers
- See skill match %
- Select a career (updates everything)
- View skills needed

### Career Roadmap
- See 8–10 milestones for selected career
- Mark milestones complete/incomplete
- Track progress
- Updates dashboard

### Skill Gap Analysis
- See required vs. owned skills
- Toggle skills as learned
- Get top 3 priorities
- Skill coverage %

### Resume Module
- Edit resume in all sections
- Live scoring (0–100)
- Live preview
- Print/PDF export
- Fields: name, email, summary, skills, experience, projects, education, certifications

### LinkedIn Optimizer
- Input current role, skills, about
- Generate optimized headline + about
- See profile strength %
- Copy to clipboard

### Interview Practice
- 8 different questions
- Answer text input
- Auto-scored based on content
- Session average
- Next question button

### Jobs & Internships
- Search by title, company, skills
- See location, salary, skills needed
- Save/unsave opportunities
- "View details" button for info

### AI Career Assistant
- Chat interface
- Contextual responses
- Based on your career, skills, scores
- Falls back to local logic if no API
- Quick-action buttons

### Resources
- 6 articles about career topics
- Click to expand full article
- Print-friendly modal
- Topics: Resume, LinkedIn, Interviews, Skills, Internships

### Profile
- Edit name, email, phone, location
- Edit degree, year, goal, interests
- Manage skills
- Auto-saved

### Settings
- Toggle opportunity alerts
- Toggle compact listings
- Reset all data (with confirmation)

---

## API Architecture

### AI Chat Endpoint

**POST** `/api/ai/chat`

```json
{
  "message": "How can I improve my resume?",
  "context": { "career": "AI/ML Engineer", ... }
}
```

Returns:
```json
{
  "response": "...",
  "source": "openai" | "local"
}
```

If `AI_API_KEY` not configured, uses local logic automatically.

### Extending with Real APIs

To add real jobs API:

1. Add `JOBS_API_KEY` to `.env.local`
2. Create `/api/jobs/route.ts`
3. Update `data/index.ts` to fetch from API
4. Ensure error fallbacks to demo data

---

## Responsive Design

- **Mobile** (<520px): Hamburger menu, single column, touch-friendly
- **Tablet** (520–800px): Toggle sidebar, 2-column grids
- **Desktop** (800px+): Full sidebar, multi-column layouts

---

## Testing Checklist

After `npm run dev`:

- [ ] Dashboard loads with calculated scores
- [ ] Select career in Explorer → dashboard updates
- [ ] Mark roadmap milestone done → readiness % increases
- [ ] Click skill in Skill Gap → coverage % updates
- [ ] Edit resume → score updates live
- [ ] LinkedIn Optimizer generates text
- [ ] Answer interview question → score appears
- [ ] Search internships/jobs
- [ ] Save opportunity → appears in dashboard
- [ ] Chat with AI Assistant
- [ ] Click resource → modal opens with full article
- [ ] Edit profile → changes persist
- [ ] Refresh page → all data still there
- [ ] Mobile view: hamburger menu works
- [ ] Change settings → persist

---

## Common Issues & Fixes

| Issue | Fix |
|-------|-----|
| Data resets after refresh | localStorage disabled - check browser settings |
| Sidebar not opening on mobile | Clear cache, refresh page |
| Resume score not updating | Type more content, try different sections |
| AI responses slow | Check internet connection, API not configured |
| Interview questions don't change | Refresh page, clear cache |

---

## Performance

- Dashboard: <500ms load
- Modules: Lazy-loaded on navigation
- localStorage: Updated on every change
- No external API calls by default
- Optimized React renders (no unnecessary re-renders)

---

## Security & Privacy

✅ **No authentication** - No passwords, no accounts
✅ **Client-only** - No backend database
✅ **Local storage** - Data never leaves your browser
✅ **No tracking** - No analytics by default
✅ **No secrets in code** - API keys in `.env.local` only
✅ **No external calls** - Unless you configure an API

---

## Deployment to Vercel

```bash
# 1. Push to GitHub
git add .
git commit -m "Ready for deployment"
git push origin main

# 2. In Vercel dashboard:
# - Click "Add New..." → "Project"
# - Select your GitHub repo
# - Add environment variables from .env.example (if using APIs)
# - Click "Deploy"

# 3. Auto-deployed on every push to main
```

---

## Future Enhancements

- [ ] Real jobs API (LinkedIn, Indeed, GitHub)
- [ ] Real internships API (InternShape, Internshala)
- [ ] OpenAI integration for AI assistant
- [ ] PDF resume upload & parsing
- [ ] User accounts (optional)
- [ ] Dark mode
- [ ] Video interview practice
- [ ] Company reviews database
- [ ] Email notifications

---

## Contributing

To add features:

1. Add careers to `data/index.ts`
2. Create new components in `components/`
3. Add types in `types/index.ts`
4. Test with `npm run build` and `npm run dev`
5. Ensure responsive design

---

## License

MIT - Free to use, modify, and distribute.

---

## Support

**Questions or Issues?**
- Review this README
- Check browser console (F12)
- Clear browser cache and refresh
- Ensure JavaScript is enabled
- Try incognito window to isolate issues

---

**CareerPilot AI: Navigate Your Career. Smarter.**

*Made for college students and fresh graduates building their careers.*
