export interface Experience { id: string; company: string; position: string; duration: string; location?: string; responsibilities: string[]; technologies: string[]; }
export interface Project { id: string; name: string; description: string; problem: string; solution: string; technologies: string[]; github?: string; featured?: boolean; }
export interface Education { degree: string; institution: string; duration: string; specialization: string; cgpa?: string; }
export interface Skill { category: string; items: string[]; }

export const profile = {
  name: "Adusumalli Sai Pavan",
  title: "Agentic AI & Full Stack Developer",
  tagline: "Building Intelligent Systems That Solve Real Problems",
  summary: "Full Stack & AI Engineer with 4 years building enterprise software, cloud-native apps & AI solutions.",
  email: "saipavanadusumalli2001@gmail.com",
  phone: "+91 9347726208",
  location: "Andhra Pradesh, India",
  github: "https://github.com/SaiPavan122001",
  linkedin: "https://www.linkedin.com/in/adusumalli-sai-pavan-111836208",
};

export const professionalSnapshot = [
  { label: "Years", value: "4+" },
  { label: "Agentic AI", value: "Specialist" },
  { label: "Full Stack", value: "Development" },
  { label: "Enterprise", value: "500+ Users" },
];

export const experience: Experience[] = [
  { id: "1", company: "Hinfinity Solutions", position: "Full Stack & AI Developer", duration: "January 2025 – May 2026", location: "India", responsibilities: ["AI apps with Python, FastAPI, LangGraph, Qdrant", "MCP servers for LLM APIs", "RAG pipelines with hybrid vector retrieval", "Langfuse observability"], technologies: ["Python", "FastAPI", "LangGraph", "Qdrant", "MCP", "RAG", "Langfuse"] },
  { id: "2", company: "Astrix Technologies", position: "Junior Full Stack Developer", duration: "May 2023 – December 2024", location: "India", responsibilities: ["Onboarding, Leave, Payroll for 500+ users", "20+ REST APIs with Java, Spring Boot, Node.js", "React.js UI with code splitting", "MySQL, PostgreSQL, MongoDB"], technologies: ["Java", "Spring Boot", "Node.js", "React.js", "JWT", "MySQL", "PostgreSQL", "MongoDB"] },
  { id: "3", company: "Nokia Networks", position: "System Verification Intern", duration: "August 2022 – March 2023", location: "India", responsibilities: ["Docker, Kubernetes in OpenShift", "CI/CD with Helm charts", "Bash automation"], technologies: ["Docker", "Kubernetes", "OpenShift", "Helm", "CI/CD", "Bash"] },
];

export const skills: Skill[] = [
  { category: "Agentic AI", items: ["LangChain", "LangGraph", "AutoGen", "RAG", "MCP", "Langfuse"] },
  { category: "Programming", items: ["Python", "Java", "JavaScript", "TypeScript"] },
  { category: "Frontend", items: ["React.js", "HTML5", "CSS3"] },
  { category: "Backend", items: ["FastAPI", "Node.js", "Spring Boot", "REST APIs"] },
  { category: "Databases", items: ["MySQL", "PostgreSQL", "MongoDB", "Qdrant"] },
  { category: "Cloud/DevOps", items: ["AWS", "Docker", "Kubernetes", "OpenShift", "CI/CD"] },
];

export const projects: Project[] = [
  { id: "1", name: "Enterprise AI Operations Copilot", description: "End-to-end copilot using FastAPI, React, LangGraph, Qdrant for root cause analysis.", problem: "Need automated incident investigation.", solution: "Multi-agent workflow with natural language UI.", technologies: ["FastAPI", "React", "LangGraph", "Qdrant", "RAG"], featured: true, github: "https://github.com/SaiPavan122001/Enterprise-ai-operations-copilot" },
  { id: "2", name: "AI Chatbot with MCP", description: "Enterprise knowledge assistant.", problem: "Need docs access without hallucinations.", solution: "MCP-powered assistant.", technologies: ["LLM APIs", "MCP", "RAG"], github: "#" },
  { id: "3", name: "HR & Payroll SaaS", description: "Multi-tenant HR platform.", problem: "Need HR system with tenant isolation.", solution: "Full-stack HR/payroll with multi-tenant DB.", technologies: ["React.js", "Spring Boot", "PostgreSQL"], github: "#" },
  { id: "4", name: "Onboarding & Leave System", description: "HR modules for 500+ users.", problem: "Need streamlined HR processes.", solution: "REST APIs with JWT auth and React UI.", technologies: ["React.js", "Spring Boot", "MySQL"], github: "#" },
];

export const education: Education[] = [
  { degree: "Bachelor of Technology in ECE", institution: "Koneru Lakshmaiah Educational Foundation", duration: "2019 – 2023", specialization: "Electronics and Communication Engineering", cgpa: "8.8" },
  { degree: "Intermediate", institution: "Narayana Junior College", duration: "2017 – 2019", specialization: "MPC", cgpa: "9.8" },
  { degree: "SSC", institution: "Montessori Public School", duration: "2016 – 2017", specialization: "Secondary Education", cgpa: "9.3" },
];

export const socialLinks = { github: "https://github.com/SaiPavan122001", linkedin: "https://www.linkedin.com/in/adusumalli-sai-pavan-111836208", email: "mailto:saipavanadusumalli2001@gmail.com" };
