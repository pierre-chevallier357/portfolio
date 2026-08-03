import { Component, signal, WritableSignal } from '@angular/core';
import { InView } from '../../directives/in-view/in-view';

enum SkillColor {
  PineTeal = 'pine-teal',
  DustyGrape = 'dusty-grape',
  BrilliantAzure = 'brilliant-azure',
  BlushRose = 'blush-rose',
  GoldenOrange = 'golden-orange',
  SoftLinen = 'soft-linen',
}

interface Skill {
  name: string;
  level: number;
  color: SkillColor;
}

interface SkillCategory {
  title: string;
  description: string;
  skills: Skill[];
}

@Component({
  selector: 'skills',
  imports: [InView],
  templateUrl: './skills.html',
  styleUrl: './skills.scss',
})
export class Skills {
  protected readonly categories: SkillCategory[] = [
    {
      title: 'Front-end',
      description:
        'Développement d’interfaces modernes, performantes et responsives.\nExpérience sur les frameworks et bibliothèques web actuels.',
      skills: [
        { name: 'Angular', level: 90, color: SkillColor.BlushRose },
        { name: 'TypeScript', level: 85, color: SkillColor.BrilliantAzure },
        { name: 'HTML5', level: 95, color: SkillColor.GoldenOrange },
        { name: 'SCSS', level: 80, color: SkillColor.BlushRose },
        { name: 'RxJS', level: 75, color: SkillColor.DustyGrape },
      ],
    },
    {
      title: 'Back-end',
      description:
        'Conception de services robustes et évolutifs.\nMise en œuvre d’APIs et intégration avec les bases de données.',
      skills: [
        { name: 'Java', level: 88, color: SkillColor.GoldenOrange },
        { name: 'Spring Boot', level: 82, color: SkillColor.PineTeal },
        { name: 'REST APIs', level: 90, color: SkillColor.SoftLinen },
        { name: 'SQL', level: 78, color: SkillColor.SoftLinen },
      ],
    },
    {
      title: 'DevOps',
      description:
        'Gestion des infrastructures et automatisation des déploiements.\nMise en place de pipelines CI/CD et surveillance des systèmes.',
      skills: [
        { name: 'Docker', level: 80, color: SkillColor.BrilliantAzure },
        { name: 'Kubernetes', level: 75, color: SkillColor.BrilliantAzure },
        { name: 'GitLab CI/CD', level: 75, color: SkillColor.GoldenOrange },
      ],
    },
    {
      title: 'Autres',
      description:
        'Compétences variées et outils complémentaires.\nExpérience sur différents aspects du développement et de l’infrastructure.',
      skills: [
        { name: 'Jira', level: 80, color: SkillColor.BrilliantAzure },
        { name: 'Git', level: 75, color: SkillColor.GoldenOrange },
        { name: 'Méthodes agiles', level: 75, color: SkillColor.SoftLinen },
        { name: 'Cycle en V', level: 75, color: SkillColor.PineTeal },
      ],
    },
  ];
  protected readonly isInView: WritableSignal<boolean> = signal(false);
}
