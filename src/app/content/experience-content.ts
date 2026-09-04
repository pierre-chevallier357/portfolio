export type ExperienceContent = Experience[];

export interface Experience {
  id: number;
  company: string;
  missions: Mission[];
}

export interface Mission {
  id: number;
  period: string;
  location: string;
  role: string;
  company: string;
  summary: string;
  description: string;
  technologies: string[];
}
