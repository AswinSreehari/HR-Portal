export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  jobType: string;
  workMode: "Onsite" | "Remote" | "Hybrid" | string;   
  industry: string;  
  experience: string;   
  salary: string;
  postedDate: string;
  description: string;
  requirements: string[];
  benefits: string[];  
  applyLink: string;
}

  
export interface Candidate {
  id: string;
  jobId: string;
  name: string;
  email: string;
  experience: number;
  skills: string[];
  resumePath: string;   
}

  