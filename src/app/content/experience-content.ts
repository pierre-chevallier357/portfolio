export type ExperienceContent = ExperienceEntry[];

export interface ExperienceEntry {
  id: number;
  company: string;
  logo: string;
  title: string;
  description: string;
  technologies: string[];
}
