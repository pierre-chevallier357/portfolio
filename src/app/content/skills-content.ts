export type SkillsContent = SkillCategory[];

export enum SkillColor {
  PineTeal = 'pine-teal',
  DustyGrape = 'dusty-grape',
  BrilliantAzure = 'brilliant-azure',
  BlushRose = 'blush-rose',
  GoldenOrange = 'golden-orange',
  SoftLinen = 'soft-linen',
}

export interface Skill {
  name: string;
  level: number;
  color: SkillColor;
}

export interface SkillCategory {
  title: string;
  description: string;
  skills: Skill[];
}
