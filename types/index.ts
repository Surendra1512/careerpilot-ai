// Core types for CareerPilot AI

export type ModuleKey = 
  | "dashboard"
  | "explorer"
  | "roadmap"
  | "skills"
  | "resume"
  | "linkedin"
  | "interview"
  | "internships"
  | "jobs"
  | "assistant"
  | "resources"
  | "profile"
  | "settings";

export interface UserProfile {
  name: string;
  email: string;
  phone: string;
  location: string;
  degree: string;
  year: string;
  goal: string;
  interests: string;
  linkedin: string;
  github: string;
  skills: string[];
}

export interface Career {
  id: string;
  name: string;
  description: string;
  match: number;
  requiredSkills: string[];
  recommendedSkills: string[];
  responsibilities: string[];
  roadmap: string[];
  portfolioProjectIdeas: string[];
  interviewTopics: string[];
  resources: string[];
}

export interface Skill {
  name: string;
  learned: boolean;
  priority: "high" | "medium" | "low";
  category: string;
}

export interface Resume {
  name: string;
  email: string;
  phone: string;
  location: string;
  linkedin: string;
  github: string;
  summary: string;
  skills: string;
  experience: string;
  education: string;
  projects: string;
  certifications: string;
  achievements: string;
}

export interface LinkedInProfile {
  headline: string;
  role: string;
  skills: string;
  about: string;
  experience: string;
  education: string;
}

export interface RoadmapProgress {
  career: string;
  completed: number;
  total: number;
}

export interface InterviewSession {
  id: string;
  role: string;
  difficulty: "beginner" | "intermediate" | "advanced";
  questions: InterviewQuestion[];
  score: number;
  timestamp: number;
}

export interface InterviewQuestion {
  id: string;
  category: string;
  question: string;
  answer: string;
  score: number;
  feedback: string;
}

export interface Opportunity {
  id: string;
  title: string;
  company: string;
  location: string;
  type: "job" | "internship";
  salary?: string;
  skills: string[];
  description: string;
  applicationUrl?: string;
  saved: boolean;
}

export interface Resource {
  id: string;
  category: string;
  title: string;
  summary: string;
  content: string;
  link?: string;
}

export interface ApplicationState {
  profile: UserProfile;
  career: Career;
  skills: Skill[];
  roadmapProgress: RoadmapProgress;
  resume: Resume;
  linkedIn: LinkedInProfile;
  interviewSessions: InterviewSession[];
  savedOpportunities: Opportunity[];
  settings: Settings;
  lastUpdated: number;
}

export interface Settings {
  alerts: boolean;
  compactMode: boolean;
  theme: "light" | "dark";
  notifications: boolean;
}

export interface Message {
  from: "user" | "ai";
  text: string;
  timestamp?: number;
}

export interface AssistantContext {
  career: Career;
  userSkills: string[];
  skillGaps: string[];
  roadmapProgress: number;
  resumeScore: number;
  linkedInScore: number;
  interviewReadiness: number;
}
