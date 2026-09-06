"use client";

import { useEffect, useState } from "react";
import {
  ArrowRight, Award, Bell, BookOpen, BriefcaseBusiness, Bot,
  Check, ChevronRight, FileText, GraduationCap, LayoutDashboard,
  Linkedin, Map, Menu, Mic2, Search, Settings, Sparkles, Target, TrendingUp,
  UserRound, X, Zap, Download, Bookmark, BookmarkCheck, RotateCcw, Save,
  Send, Copy
} from "lucide-react";
import { CAREERS, INTERNSHIP_DATA, JOB_DATA, RESOURCES_DATA } from "@/data";
import type { ModuleKey, UserProfile, Career, Resume, LinkedInProfile, Message } from "@/types";

const NAV = [
  ["dashboard","Dashboard",LayoutDashboard],["explorer","Career Explorer",Target],["roadmap","Career Roadmap",Map],
  ["skills","Skill Gap",TrendingUp],["resume","Resume",FileText],["linkedin","LinkedIn Optimizer",Linkedin],
  ["interview","Interview Prep",Mic2],["internships","Internships",GraduationCap],["jobs","Jobs",BriefcaseBusiness],
  ["assistant","AI Career Assistant",Bot],["resources","Resources",BookOpen]
] as const;

const DEFAULT_PROFILE: UserProfile = {
  name: "Rahul Sharma",
  email: "rahul@example.com",
  phone: "",
  location: "India",
  degree: "B.Tech Computer Science",
  year: "3rd Year",
  goal: "AI / ML Engineer",
  interests: "AI, Machine Learning, Technology",
  linkedin: "",
  github: "",
  skills: ["Python", "Machine Learning"]
};

const DEFAULT_RESUME: Resume = {
  name: "Rahul Sharma",
  email: "rahul@example.com",
  phone: "",
  location: "India",
  linkedin: "",
  github: "",
  summary: "B.Tech Computer Science student interested in AI and machine learning.",
  skills: "Python, Machine Learning, SQL",
  experience: "AI/ML Intern — Averixis Solutions",
  education: "B.Tech Computer Science",
  projects: "Built a machine learning project for classification and a Python automation project.",
  certifications: "",
  achievements: ""
};

const DEFAULT_LINKEDIN: LinkedInProfile = {
  headline: "AI/ML student and aspiring ML Engineer",
  role: "AI/ML student and aspiring ML Engineer",
  skills: "Python, Machine Learning, SQL",
  about: "I am a B.Tech Computer Science student building practical AI and machine learning skills.",
  experience: "",
  education: ""
};

const INTERVIEW_QUESTIONS = [
  "Tell me about a machine learning project you built.",
  "How would you handle an imbalanced classification dataset?",
  "Explain overfitting to a non-technical stakeholder.",
  "Why do you want this role?",
  "Describe a time you failed and what you learned.",
  "How do you stay updated with new technology?",
  "Tell me about a time you worked in a team.",
  "What's your approach to debugging complex issues?"
];

// Utility Components
function Brand(){
  return <div className="brand">
    <div className="brand-mark"><ArrowRight size={20}/></div>
    <div>
      <b>CareerPilot</b> <em>AI</em>
      <small>Navigate Your Career. Smarter.</small>
    </div>
  </div>
}

function ProgressRing({value}:{value:number}){
  return <div className="ring" style={{"--deg":`${value*3.6}deg`} as React.CSSProperties}>
    <div>
      <b>{value}%</b>
      <small>Ready</small>
    </div>
  </div>
}

function Button({children,onClick,primary=false,disabled=false,className=""}:{children:React.ReactNode,onClick?:()=>void,primary?:boolean,disabled?:boolean,className?:string}){
  return <button disabled={disabled} onClick={onClick} className={`${primary?"primary":"outline"} ${className}`}>
    {children}
  </button>
}

function Head({eyebrow,title,children}:any){
  return <div className="card-head">
    <div>
      <small>{eyebrow}</small>
      <h3>{title}</h3>
    </div>
    {children}
  </div>
}

function Stat({icon:Icon,label,value,note}:any){
  return <div className="stat">
    <div className="stat-icon"><Icon size={18}/></div>
    <div>
      <small>{label}</small>
      <b>{value}</b>
      <em>{note}</em>
    </div>
  </div>
}

function Intro({icon,eyebrow,title,text}:any){
  return <div className="intro">
    <div>
      <small>{eyebrow}</small>
      <h2>{title}</h2>
      <p>{text}</p>
    </div>
    <div className="intro-icon">{icon}</div>
  </div>
}

// Layout Component
function Shell(p:any){
  return <div className="app">
    <aside className={p.mobile?"side open":"side"}>
      <div className="side-brand">
        <Brand/>
        <button className="close" onClick={()=>p.setMobile(false)}><X/></button>
      </div>
      <div className="mini">
        <div className="avatar">RS</div>
        <div>
          <b>Rahul Sharma</b>
          <small>B.Tech • 3rd Year</small>
        </div>
      </div>
      <nav>
        {NAV.map(([key,label,Icon]:any)=>
          <button className={p.active===key?"nav active":"nav"} key={key} onClick={()=>p.go(key)}>
            <Icon size={17}/>
            <span>{label}</span>
            {p.active===key&&<ChevronRight size={14}/>}
          </button>
        )}
      </nav>
      <div className="divider"/>
      <button className="nav" onClick={()=>p.go("profile")}><UserRound size={17}/><span>Profile</span></button>
      <button className="nav" onClick={()=>p.go("settings")}><Settings size={17}/><span>Settings</span></button>
      <div className="side-card">
        <Sparkles size={18}/>
        <b>CareerPilot AI</b>
        <small>From education to opportunities.</small>
      </div>
    </aside>
    <main>
      <header>
        <button className="hamb" onClick={()=>p.setMobile(true)}><Menu/></button>
        <div>
          <small>CAREER OS</small>
          <h1>{p.title}</h1>
        </div>
        <div className="head-actions">
          <button className="head-icon"><Bell size={18}/></button>
          <div className="user-pill"><span className="avatar sm">RS</span>Rahul</div>
        </div>
      </header>
      <section className="page">{p.children}</section>
      {p.toast&&<div className="toast"><Check size={16}/>{p.toast}</div>}
    </main>
  </div>
}

// Dashboard
function Dashboard({profile,career,readiness,resumeScore,linkedScore,interviewScore,gap,completed,setCompleted,go,saved,notify}:any){
  return <div className="dashboard">
    <div className="hero">
      <div>
        <span className="pill"><Sparkles size={13}/> AI-powered career guidance</span>
        <h2>Good evening, {profile.name.split(" ")[0]} 👋</h2>
        <p>Your career journey is moving forward. Here is what to focus on next.</p>
        <Button primary onClick={()=>go("explorer")}>Explore careers <ArrowRight size={16}/></Button>
      </div>
      <ProgressRing value={readiness}/>
    </div>
    <div className="stats">
      <Stat icon={Award} label="Career readiness" value={`${readiness}%`} note="Calculated from your progress"/>
      <Stat icon={FileText} label="Resume score" value={`${resumeScore}/100`} note="Based on your current draft"/>
      <Stat icon={Linkedin} label="LinkedIn profile" value={`${linkedScore}%`} note="Profile strength"/>
      <Stat icon={Mic2} label="Interview readiness" value={`${interviewScore}%`} note={interviewScore?"Based on practice":"Start a mock interview"}/>
    </div>
    <div className="cols">
      <div className="card">
        <Head eyebrow="YOUR GOAL" title={career.name}>
          <button className="link" onClick={()=>go("explorer")}>Change</button>
        </Head>
        <div className="match">
          <b>{career.match}%</b>
          <div>
            <strong>Career match</strong>
            <small>Based on your selected interests and skills</small>
          </div>
        </div>
        <div className="mini-road">
          {career.roadmap.slice(0,6).map((s:string,i:number)=>
            <div key={s} className={i<completed?"done":""}>
              <span>{i<completed?"✓":i+1}</span>
              <small>{s}</small>
            </div>
          )}
        </div>
        <Button className="wide" onClick={()=>go("roadmap")}>Open roadmap <ArrowRight size={15}/></Button>
      </div>
      <div className="card">
        <Head eyebrow="NEXT BEST ACTION" title={gap.length?`Close your ${gap[0]} gap`:"Build another project"}>
          <Bot size={19}/>
        </Head>
        <div className="action">
          <div className="action-icon">🧠</div>
          <div>
            <strong>{gap.length?gap[0]:"Portfolio project"}</strong>
            <small>{gap.length?"High impact for "+career.name:"Keep your momentum and add evidence."}</small>
          </div>
        </div>
        <Button className="wide" onClick={()=>go("skills")}>View skill gap <ArrowRight size={15}/></Button>
      </div>
    </div>
    <div className="card">
      <Head eyebrow="OPPORTUNITIES" title="Your saved & recommended roles">
        <button className="link" onClick={()=>go("internships")}>Browse all</button>
      </Head>
      <div className="opp-grid">
        {(saved.length? saved.slice(0,3):["AI/ML Intern","Machine Learning Intern","Data Science Intern"]).map((x:string)=>
          <div className="opp" key={x}>
            <div className="logo">{x[0]}</div>
            <div>
              <strong>{x}</strong>
              <small>Recommended for {career.name}</small>
            </div>
            <button onClick={()=>go(x.includes("Intern")?"internships":"jobs")}>
              <ArrowRight size={15}/>
            </button>
          </div>
        )}
      </div>
    </div>
  </div>
}

// Career Explorer
function Explorer({career,selectCareer,go}:any){
  return <div>
    <Intro icon={<Target/>} eyebrow="CAREER DISCOVERY" title="Find the right career" text="Select a target role. Your roadmap and skill-gap analysis update automatically."/>
    <div className="career-grid">
      {CAREERS.map(c=>
        <button key={c.id} className={career.id===c.id?"career selected":"career"} onClick={()=>selectCareer(c)}>
          <div className="career-top">
            <span className="career-icon"><Zap size={18}/></span>
            <b>{c.match}% match</b>
          </div>
          <h3>{c.name}</h3>
          <p>{c.description}</p>
          <div className="tags">
            {c.requiredSkills.slice(0,4).map(s=>
              <span key={s}>{s}</span>
            )}
          </div>
        </button>
      )}
    </div>
    <div className="callout">
      <div>
        <b>Selected career: {career.name}</b>
        <small>{career.requiredSkills.length} core skills • {career.roadmap.length} roadmap milestones</small>
      </div>
      <Button primary onClick={()=>go("roadmap")}>Build roadmap <ArrowRight size={16}/></Button>
    </div>
  </div>
}

// Career Roadmap
function Roadmap({career,completed,setCompleted}:any){
  return <div>
    <Intro icon={<Map/>} eyebrow="PERSONALIZED PATH" title={`${career.name} roadmap`} text="Complete milestones and your dashboard readiness score updates."/>
    <div className="roadmap">
      {career.roadmap.map((s:string,i:number)=>
        <div className="road-item" key={s}>
          <button className={i<completed?"road-dot done":"road-dot"} onClick={()=>setCompleted(i<completed?i:Math.min(i+1,career.roadmap.length))}>
            {i<completed?<Check size={15}/>:i+1}
          </button>
          <div>
            <small>STEP {i+1}</small>
            <h3>{s}</h3>
            <p>{i===0?"Understand the role and expectations.":i===1?"Build fundamentals with focused practice.":i===2?"Create evidence through practical projects.":i===3?"Turn skills into portfolio-ready work.":i===4?"Prepare resume, LinkedIn and applications.":i===5?"Apply to relevant opportunities and practice interviews.":"Track interviews, feedback and outcomes."}</p>
            <span>{i<completed?"Completed":i===completed?"Next milestone":"Upcoming"}</span>
          </div>
        </div>
      )}
    </div>
    <div className="progress-note">
      <b>{completed}/{career.roadmap.length}</b> milestones completed. Click the next circle to update progress.
    </div>
  </div>
}

// Skill Gap
function Skills({career,owned,toggle,gap}:any){
  const covered=Math.round((career.requiredSkills.filter((s:string)=>owned.includes(s)).length/career.requiredSkills.length)*100);
  
  return <div>
    <Intro icon={<TrendingUp/>} eyebrow="SKILL GAP ANALYSIS" title="Close your skill gaps" text="Click skills you already have. The coverage score and recommendations update instantly."/>
    <div className="cols">
      <div className="card">
        <Head eyebrow="TARGET ROLE" title={career.name}>
          <span className="score">{covered}% covered</span>
        </Head>
        {career.requiredSkills.map((s:string)=>
          <button className="skill" key={s} onClick={()=>toggle(s)}>
            <span className={owned.includes(s)?"check on":"check"}>{owned.includes(s)&&<Check size={14}/>}</span>
            <b>{s}</b>
            <small>{owned.includes(s)?"You have this skill":"Gap to close"}</small>
          </button>
        )}
      </div>
      <div className="card">
        <Head eyebrow="AI PRIORITIES" title="Your next 3 moves">
          <Bot size={18}/>
        </Head>
        {(gap.length?gap:["Build projects","Interview practice","Networking"]).slice(0,3).map((s:string,i:number)=>
          <div className="priority" key={s}>
            <b>{i+1}</b>
            <div>
              <strong>{s}</strong>
              <small>{i===0?"Highest priority for your target role":"Build through a practical project or guided practice."}</small>
            </div>
            <ArrowRight size={15}/>
          </div>
        )}
      </div>
    </div>
  </div>
}

// Resume Module
function ResumeModule({data,setData,score,notify}:any){
  const update=(k:string,v:string)=>setData({...data,[k]:v});
  
  return <div>
    <Intro icon={<FileText/>} eyebrow="RESUME CENTER" title="Build and analyze your resume" text="Edit your resume content, see a live score and download a printable copy."/>
    <div className="resume-grid">
      <div className="card form">
        <Head eyebrow="EDITOR" title="Resume details">
          <span className="score">{score}/100</span>
        </Head>
        {[["name","Full name"],["email","Email"],["phone","Phone"],["location","Location"],["summary","Professional summary"],["skills","Skills"],["projects","Projects"],["experience","Experience"],["education","Education"],["certifications","Certifications"]].map(([k,l])=>
          <label key={k}>
            {l}
            {["summary","projects","experience","education","certifications"].includes(k)?
              <textarea value={data[k]} onChange={e=>update(k,e.target.value)}/>:
              <input value={data[k]} onChange={e=>update(k,e.target.value)}/>
            }
          </label>
        )}
        <div className="buttons">
          <Button primary onClick={()=>notify("Resume saved locally")}>
            <Save size={15}/>Save
          </Button>
          <Button onClick={()=>window.print()}>
            <Download size={15}/>Print / PDF
          </Button>
        </div>
      </div>
      <div className="card resume-preview">
        <div className="preview-top">
          <span>LIVE PREVIEW</span>
          <b>{score}/100</b>
        </div>
        <h2>{data.name||"Your Name"}</h2>
        {data.email&&<p>{data.email}</p>}
        {data.phone&&<p>{data.phone}</p>}
        {data.location&&<p>{data.location}</p>}
        {data.summary&&<><h4>SUMMARY</h4><p>{data.summary}</p></>}
        {data.skills&&<><h4>SKILLS</h4><p>{data.skills}</p></>}
        {data.experience&&<><h4>EXPERIENCE</h4><p>{data.experience}</p></>}
        {data.projects&&<><h4>PROJECTS</h4><p>{data.projects}</p></>}
        {data.education&&<><h4>EDUCATION</h4><p>{data.education}</p></>}
        {data.certifications&&<><h4>CERTIFICATIONS</h4><p>{data.certifications}</p></>}
      </div>
    </div>
  </div>
}

// LinkedIn Optimizer
function LinkedInModule({data,setData,score,notify}:any){
  const [result,setResult]=useState("");
  
  const optimize=()=>{
    const role=data.role||"Aspiring professional";
    const skills=data.skills||"relevant skills";
    const output=`📌 OPTIMIZED HEADLINE\n${role} | ${skills.split(",")[0]?.trim() || "Career Development"} | Open to opportunities\n\n📝 OPTIMIZED ABOUT\n${data.about} I am actively building practical projects, improving my career-ready skills and looking for opportunities where I can learn, contribute and grow. Key focus areas: ${skills}.`;
    setResult(output);
    notify("LinkedIn optimization generated");
  };
  
  return <div>
    <Intro icon={<Linkedin/>} eyebrow="LINKEDIN OPTIMIZER" title="Improve your LinkedIn profile" text="Enter your current profile information and generate a stronger headline/About draft."/>
    <div className="cols">
      <div className="card form">
        <Head eyebrow="PROFILE INPUT" title="Your current profile">
          <span className="score">{score}%</span>
        </Head>
        <label>
          Current role / goal
          <input value={data.role} onChange={e=>setData({...data,role:e.target.value})}/>
        </label>
        <label>
          Key skills
          <input value={data.skills} onChange={e=>setData({...data,skills:e.target.value})}/>
        </label>
        <label>
          About section
          <textarea value={data.about} onChange={e=>setData({...data,about:e.target.value})}/>
        </label>
        <Button primary onClick={optimize}>
          <Sparkles size={15}/>Generate optimized profile
        </Button>
      </div>
      <div className="card">
        <Head eyebrow="AI OUTPUT" title="Suggested copy">
          <div className="linkedin-score">{score}% strength</div>
        </Head>
        {result?
          <>
            <pre className="output">{result}</pre>
            <Button onClick={()=>navigator.clipboard?.writeText(result).then(()=>notify("Copied to clipboard"))}>
              <Copy size={15}/>Copy suggestion
            </Button>
          </>:
          <div className="empty">
            <Linkedin size={28}/>
            <p>Your optimized headline and About section will appear here.</p>
          </div>
        }
      </div>
    </div>
  </div>
}

// Interview Prep
function Interview({score,setScore}:any){
  const [i,setI]=useState(0);
  const [answer,setAnswer]=useState("");
  const [feedback,setFeedback]=useState("");
  
  const submit=()=>{
    const words=answer.trim().split(/\s+/).filter(Boolean).length;
    const s=Math.min(100,Math.max(30,35+Math.min(45,words)+(/[0-9%]/.test(answer)?10:0)+(/because|result|impact|example/i.test(answer)?10:0)));
    setScore(Math.round((score*i+s)/(i+1)));
    setFeedback(`Practice score: ${s}/100. ${words<35?"Add a specific example, your actions and measurable result.":"Good detail. Make your answer tighter and end with the impact or lesson."}`);
  };
  
  return <div>
    <Intro icon={<Mic2/>} eyebrow="INTERVIEW PREP" title="Practice a mock interview" text="Answer role-specific questions and receive a structured practice score."/>
    <div className="card interview">
      <div className="questionbar">
        <span>QUESTION {i+1} OF {INTERVIEW_QUESTIONS.length}</span>
        <span className="score">Average: {score}%</span>
      </div>
      <h2>{INTERVIEW_QUESTIONS[i]}</h2>
      <textarea value={answer} onChange={e=>setAnswer(e.target.value)} placeholder="Type your answer here. Include context, your actions and the result..."/>
      <div className="buttons">
        <Button primary onClick={submit}><Check size={15}/>Evaluate answer</Button>
        <Button onClick={()=>{setI((i+1)%INTERVIEW_QUESTIONS.length);setAnswer("");setFeedback("")}}>
          Next question <ArrowRight size={15}/>
        </Button>
      </div>
      {feedback&&
        <div className="feedback">
          <Sparkles size={17}/>
          <div>
            <b>CareerPilot feedback</b>
            <p>{feedback}</p>
          </div>
        </div>
      }
    </div>
  </div>
}

// Listings (Internships & Jobs)
function Listings({type,data,query,setQuery,saved,toggleSaved}:any){
  const rows=data.filter((x:any)=>(x.title||x[0]).toLowerCase().includes(query.toLowerCase()));
  
  return <div>
    <Intro icon={<Search/>} eyebrow={`${type.toUpperCase()} DISCOVERY`} title={`Find ${type.toLowerCase()} opportunities`} text="Search the built-in opportunity dataset, filter and save roles."/>
    <div className="search">
      <Search size={17}/>
      <input value={query} onChange={e=>setQuery(e.target.value)} placeholder={`Search ${type.toLowerCase()}s, companies or skills...`}/>
    </div>
    <div className="list">
      {rows.map((x:any)=>{
        const title=x.title||x[0];
        const company=x.company||x[1];
        const location=x.location||x[2];
        const salary=x.salary||x[3];
        const skills=(x.skills||x[4]).join ? (x.skills||x[4]).join(", ") : (x.skills||x[4]);
        
        return <div className="listing" key={title}>
          <div className="logo big">{title[0]}</div>
          <div className="listing-main">
            <b>{title}</b>
            <span>{company} • {location}</span>
            <small>{salary} • {skills}</small>
          </div>
          <button className="save" onClick={()=>toggleSaved(title)}>
            {saved.includes(title)?<BookmarkCheck size={17}/>:<Bookmark size={17}/>}
          </button>
          <Button primary onClick={()=>alert(`${title}\n\nCompany: ${company}\nLocation: ${location}\nSalary/Stipend: ${salary}\nSkills: ${skills}\n\nThis is demo data. Connect a real jobs API for live applications.`)}>
            View details
          </Button>
        </div>;
      })}
    </div>
    {!rows.length&&
      <div className="empty card">
        <Search size={28}/>
        <p>No matching opportunities. Try another search.</p>
      </div>
    }
  </div>
}

// AI Career Assistant
function Assistant({messages,input,setInput,ask,loading,source}:any){
  return <div>
    <Intro icon={<Bot/>} eyebrow="CAREERPILOT AI" title="Your AI career assistant" text="Ask career questions and get guidance based on your selected career and skill gaps."/>
    <div className="chat card">
      <div className="chat-head">
        <div className="bot"><Bot size={18}/></div>
        <div>
          <b>CareerPilot</b>
          <small>Career guidance assistant</small>
        </div>
        <span>{loading ? "● Thinking…" : source === "gemini" ? "● Gemini" : "● Ready"}</span>
      </div>
      <div className="messages">
        {messages.map((m:any,i:number)=>
          <div className={m.from==="ai"?"msg ai":"msg user"} key={i}>{m.text}</div>
        )}
        {loading && <div className="msg ai">Thinking…</div>}
      </div>
      <div className="chat-input">
        <input value={input} onChange={e=>setInput(e.target.value)} onKeyDown={e=>e.key==="Enter"&&ask()} placeholder="Ask: What should I learn next?"/>
        <button onClick={ask} disabled={loading || !input.trim()}><Send size={17}/></button>
      </div>
      <div className="quick">
        <button onClick={()=>setInput("How can I improve my resume?")}>Improve my resume</button>
        <button onClick={()=>setInput("What skills should I learn next?")}>Next skills</button>
        <button onClick={()=>setInput("How should I prepare for interviews?")}>Interview prep</button>
      </div>
    </div>
  </div>
}

// Resources
function Resources({open}:any){
  return <div>
    <Intro icon={<BookOpen/>} eyebrow="CAREER RESOURCES" title="Learn something useful" text="Resources aligned with CareerPilot AI's LinkedIn content campaign."/>
    <div className="resource-grid">
      {RESOURCES_DATA.map((r,i)=>
        <article className="resource card" key={r.id}>
          <span>{r.category}</span>
          <h3>{r.title}</h3>
          <p>{r.summary}</p>
          <button className="link" onClick={()=>open(i)}>Read full resource <ArrowRight size={14}/></button>
        </article>
      )}
    </div>
  </div>
}

function ResourceModal({item,close}:any){
  return <div className="modal-backdrop" onClick={close}>
    <div className="modal card" onClick={e=>e.stopPropagation()}>
      <button className="modal-close" onClick={close}><X/></button>
      <span>{item.category}</span>
      <h2>{item.title}</h2>
      <p className="lead">{item.summary}</p>
      <div className="modal-content">
        {item.content.split('\n\n').map((para:string,i:number)=>
          <p key={i}>{para}</p>
        )}
      </div>
      <Button primary onClick={()=>window.print()}>Print resource <Download size={15}/></Button>
    </div>
  </div>
}

// Profile
function Profile({data,setData,notify}:any){
  const [skills,setSkills]=useState(data.skills.join(", "));
  
  return <div>
    <Intro icon={<UserRound/>} eyebrow="MY PROFILE" title="Your career identity" text="Edit your details. Changes are saved in your browser automatically."/>
    <div className="profile-form card form">
      <div className="avatar huge">RS</div>
      {[["name","Full name"],["email","Email"],["phone","Phone"],["location","Location"],["degree","Degree"],["year","Academic year"],["goal","Career goal"],["interests","Interests"],["linkedin","LinkedIn URL"],["github","GitHub URL"]].map(([k,l])=>
        <label key={k}>
          {l}
          <input value={data[k]} onChange={e=>setData({...data,[k]:e.target.value})}/>
        </label>
      )}
      <label>
        Skills (comma separated)
        <input value={skills} onChange={e=>setSkills(e.target.value)}/>
      </label>
      <Button primary onClick={()=>{setData({...data,skills:skills.split(",").map((x:string)=>x.trim()).filter(Boolean)});notify("Profile saved locally")}}>
        <Save size={15}/>Save profile
      </Button>
    </div>
  </div>
}

// Settings
function SettingsModule({data,setData,notify}:any){
  return <div>
    <Intro icon={<Settings/>} eyebrow="PREFERENCES" title="Settings" text="Your preferences are stored locally in this browser."/>
    <div className="settings card">
      <label>
        <div>
          <b>Opportunity alerts</b>
          <small>Show recommended opportunity reminders.</small>
        </div>
        <input type="checkbox" checked={data.alerts} onChange={e=>setData({...data,alerts:e.target.checked})}/>
      </label>
      <label>
        <div>
          <b>Compact listings</b>
          <small>Use a denser layout for opportunities.</small>
        </div>
        <input type="checkbox" checked={data.compactMode} onChange={e=>setData({...data,compactMode:e.target.checked})}/>
      </label>
      <div className="buttons">
        <Button primary onClick={()=>notify("Settings saved locally")}>
          <Save size={15}/>Save settings
        </Button>
        <Button onClick={()=>{if(confirm("Reset all application data? This cannot be undone.")){localStorage.removeItem("careerpilot-state");location.reload()}}}>
          <RotateCcw size={15}/>Reset demo data
        </Button>
      </div>
    </div>
  </div>
}

// Main App
export default function CareerPilotApp(){
  const [active,setActive]=useState<ModuleKey>("dashboard");
  const [mobile,setMobile]=useState(false);
  const [profile,setProfile]=useState(DEFAULT_PROFILE);
  const [career,setCareer]=useState(CAREERS[0]);
  const [completed,setCompleted]=useState(3);
  const [saved,setSaved]=useState<string[]>([]);
  const [toast,setToast]=useState("");
  const [resume,setResume]=useState(DEFAULT_RESUME);
  const [linkedin,setLinkedin]=useState(DEFAULT_LINKEDIN);
  const [owned,setOwned]=useState<string[]>(DEFAULT_PROFILE.skills);
  const [interviewScore,setInterviewScore]=useState(0);
  const [assistant,setAssistant]=useState<Message[]>([{from:"ai",text:"Hi! I'm CareerPilot. Ask me about careers, skills, resumes, LinkedIn, interviews, internships or your next step."}]);
  const [assistantInput,setAssistantInput]=useState("");
  const [assistantLoading,setAssistantLoading]=useState(false);
  const [assistantSource,setAssistantSource]=useState<"gemini"|"local-fallback"|null>(null);
  const [resource,setResource]=useState<number|null>(null);
  const [settings,setSettings]=useState({alerts:true,compactMode:false,theme:"light" as const,notifications:true});
  const [loaded,setLoaded]=useState(false);
  const [query,setQuery]=useState("");

  useEffect(()=>{
    try{
      const raw=localStorage.getItem("careerpilot-state");
      if(raw){
        const s=JSON.parse(raw);
        setProfile(s.profile??profile);
        const careerObj = CAREERS.find(c => c.name === s.career?.name) || CAREERS[0];
        setCareer(careerObj);
        setCompleted(s.completed??3);
        setSaved(s.saved??[]);
        setResume(s.resume??resume);
        setLinkedin(s.linkedin??linkedin);
        setOwned(s.owned??owned);
        setSettings(s.settings??settings);
      }
    }catch{}
    finally{setLoaded(true)}
  },[]);

  useEffect(()=>{
    if(!loaded)return;
    localStorage.setItem("careerpilot-state",JSON.stringify({profile,career,completed,saved,resume,linkedin,owned,settings}));
  },[loaded,profile,career,completed,saved,resume,linkedin,owned,settings]);

  const gap=career.requiredSkills.filter(s=>!owned.includes(s));
  const readiness=Math.min(98,Math.round(55+owned.filter(s=>career.requiredSkills.includes(s)).length/career.requiredSkills.length*30+completed*2));
  const resumeScore=Math.min(96,Math.round(50+(resume.summary.length>40?10:0)+(resume.skills.length>15?10:0)+(resume.projects.length>40?14:0)+(resume.experience.length>15?10:0)));
  const linkedScore=Math.min(96,Math.round(45+(linkedin.role.length>25?15:0)+(linkedin.skills.length>20?12:0)+(linkedin.about.length>60?20:0)));
  const title=(NAV.find(x=>x[0]===active)?.[1] as string)||"Dashboard";
  
  const notify=(x:string)=>{setToast(x);setTimeout(()=>setToast(""),1800)};
  const go=(x:ModuleKey)=>{setActive(x);setMobile(false)};

  const selectCareer=(c:Career)=>{setCareer(c);setProfile(p=>({...p,goal:c.name}));notify(`${c.name} selected`)};
  const toggleSaved=(name:string)=>{
    const isAlreadySaved=saved.includes(name);
    setSaved(s=>s.includes(name)?s.filter(x=>x!==name):[...s,name]);
    notify(isAlreadySaved?"Removed from saved":"Saved to your opportunities")
  };
  
  const askAI=async()=>{
    const q=assistantInput.trim();
    if(!q || assistantLoading)return;

    const userMessage: Message = {from:"user", text:q, timestamp:Date.now()};
    setAssistant(m=>[...m,userMessage]);
    setAssistantInput("");
    setAssistantLoading(true);

    try{
      const context = {
        targetCareer: career.name,
        skills: profile.skills,
        degree: profile.degree,
        year: profile.year,
        experience: resume.experience,
        goal: profile.goal,
        resumeSummary: resume.summary,
        skillGaps: gap,
        roadmapCompleted: completed,
        roadmapTotal: career.roadmap.length,
        resumeScore,
        linkedInScore: linkedScore,
        interviewScore,
        // Send only previous messages. The current question is sent separately
        // as `message`, avoiding duplicate user turns in Gemini chat history.
        history: assistant.slice(-10).map(m=>({
          role: m.from === "user" ? "user" : "model",
          text: m.text
        }))
      };

      const response = await fetch("/api/ai/chat", {
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({message:q,context})
      });

      const data = await response.json();
      if(!response.ok || !data.response) throw new Error(data.error || "AI request failed");

      setAssistantSource(data.source === "gemini" ? "gemini" : "local-fallback");
      setAssistant(m=>[...m,{from:"ai",text:data.response,timestamp:Date.now()}]);
    }catch(error){
      console.error("CareerPilot AI request failed:",error);
      setAssistantSource("local-fallback");
      setAssistant(m=>[...m,{
        from:"ai",
        text:`I couldn't reach the AI service right now. For **${career.name}**, start with **${gap[0] || "building a strong portfolio project"}** and I can continue helping once the service is available.`,
        timestamp:Date.now()
      }]);
    }finally{
      setAssistantLoading(false);
    }
  };

  if(!loaded)return <div className="app"><main><section className="page" style={{display:"grid",placeItems:"center"}}>Loading...</section></main></div>;

  if(active==="dashboard")return <Shell {...{active,setActive:go,go,mobile,setMobile,title,toast}}><Dashboard {...{profile,career,readiness,resumeScore,linkedScore,interviewScore,gap,completed,setCompleted,go,saved,notify}}/></Shell>;
  if(active==="explorer")return <Shell {...{active,setActive:go,go,mobile,setMobile,title,toast}}><Explorer career={career} selectCareer={selectCareer} go={go}/></Shell>;
  if(active==="roadmap")return <Shell {...{active,setActive:go,go,mobile,setMobile,title,toast}}><Roadmap career={career} completed={completed} setCompleted={setCompleted}/></Shell>;
  if(active==="skills")return <Shell {...{active,setActive:go,go,mobile,setMobile,title,toast}}><Skills career={career} owned={owned} toggle={(s:string)=>setOwned(x=>x.includes(s)?x.filter(y=>y!==s):[...x,s])} gap={gap}/></Shell>;
  if(active==="resume")return <Shell {...{active,setActive:go,go,mobile,setMobile,title,toast}}><ResumeModule data={resume} setData={setResume} score={resumeScore} notify={notify}/></Shell>;
  if(active==="linkedin")return <Shell {...{active,setActive:go,go,mobile,setMobile,title,toast}}><LinkedInModule data={linkedin} setData={setLinkedin} score={linkedScore} notify={notify}/></Shell>;
  if(active==="interview")return <Shell {...{active,setActive:go,go,mobile,setMobile,title,toast}}><Interview score={interviewScore} setScore={setInterviewScore}/></Shell>;
  if(active==="internships")return <Shell {...{active,setActive:go,go,mobile,setMobile,title,toast}}><Listings type="Internship" data={INTERNSHIP_DATA} query={query} setQuery={setQuery} saved={saved} toggleSaved={toggleSaved}/></Shell>;
  if(active==="jobs")return <Shell {...{active,setActive:go,go,mobile,setMobile,title,toast}}><Listings type="Job" data={JOB_DATA} query={query} setQuery={setQuery} saved={saved} toggleSaved={toggleSaved}/></Shell>;
  if(active==="assistant")return <Shell {...{active,setActive:go,go,mobile,setMobile,title,toast}}><Assistant messages={assistant} input={assistantInput} setInput={setAssistantInput} ask={askAI} loading={assistantLoading} source={assistantSource}/></Shell>;
  if(active==="resources")return <Shell {...{active,setActive:go,go,mobile,setMobile,title,toast}}><Resources open={setResource}/>{resource!==null&&<ResourceModal item={RESOURCES_DATA[resource]} close={()=>setResource(null)}/>}</Shell>;
  if(active==="profile")return <Shell {...{active,setActive:go,go,mobile,setMobile,title,toast}}><Profile data={profile} setData={setProfile} notify={notify}/></Shell>;
  return <Shell {...{active,setActive:go,go,mobile,setMobile,title,toast}}><SettingsModule data={settings} setData={setSettings} notify={notify}/></Shell>;
}
