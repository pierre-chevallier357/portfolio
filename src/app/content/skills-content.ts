export type SkillsContent = SkillCategory[];

export interface Skill {
  name: string;
  level: number;
  color: string;
  description: string;
}

export interface SkillCategory {
  title: string;
  description: string;
  skills: Skill[];
}
