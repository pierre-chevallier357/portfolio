import { Component, signal, WritableSignal } from '@angular/core';
import { InView } from '../../directives/in-view/in-view';

interface Skill {
  name: string;
  level: number;
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
  readonly categories: SkillCategory[] = [
    {
      title: 'Front-end',
      description:
        'Développement d’interfaces modernes, performantes et responsives.\nExpérience sur les frameworks et bibliothèques web actuels.',
      skills: [
        { name: 'Angular', level: 90 },
        { name: 'TypeScript', level: 85 },
        { name: 'HTML5', level: 95 },
        { name: 'SCSS', level: 80 },
        { name: 'RxJS', level: 75 },
      ],
    },
    {
      title: 'Back-end',
      description:
        'Conception de services robustes et évolutifs.\nMise en œuvre d’APIs et intégration avec les bases de données.',
      skills: [
        { name: 'Java', level: 88 },
        { name: 'Spring Boot', level: 82 },
        { name: 'REST APIs', level: 90 },
        { name: 'SQL', level: 78 },
        { name: 'Docker', level: 70 },
      ],
    },
  ];
  protected isInView: WritableSignal<boolean> = signal(false);
}
