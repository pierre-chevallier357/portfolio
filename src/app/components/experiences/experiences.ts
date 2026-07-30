import {
  afterNextRender,
  Component,
  computed,
  ElementRef,
  inject,
  PLATFORM_ID,
  Signal,
  signal,
  viewChild,
  viewChildren,
  WritableSignal,
} from '@angular/core';
import { InView } from '../../directives/in-view/in-view';
import { isPlatformBrowser } from '@angular/common';
import { Timeline } from './timeline/timeline';

interface Experience {
  id: number;
  company: string;
  logo: string;
  title: string;
  description: string;
  technologies: string[];
}

@Component({
  selector: 'experiences',
  imports: [InView, Timeline],
  templateUrl: './experiences.html',
  styleUrl: './experiences.scss',
})
export class Experiences {
  protected readonly cards: Signal<readonly ElementRef<HTMLElement>[]> =
    viewChildren<ElementRef<HTMLElement>>('card');
  protected readonly cardsContainer: Signal<readonly ElementRef<HTMLElement>[]> =
    viewChildren<ElementRef<HTMLElement>>('cardsContainer');
  protected readonly timelineHeight: Signal<number> = computed(() => {
    const cardsContainer: ElementRef<HTMLElement> = this.cardsContainer()[0];
    const firstCard: ElementRef<HTMLElement> = this.cards()[0];
    const cardsContainerHeight = cardsContainer ? cardsContainer.nativeElement?.offsetHeight : 0;
    const firstCardHeight = firstCard ? firstCard.nativeElement?.offsetHeight : 0;
    return cardsContainerHeight - firstCardHeight;
  });
  protected readonly timelineStartingPosition: Signal<number> = computed(() => {
    const firstCard: ElementRef<HTMLElement> = this.cards()[0];
    const firstCardHeight = firstCard ? firstCard.nativeElement?.offsetHeight : 0;
    return firstCardHeight / 2;
  });
  protected readonly section: Signal<ElementRef<HTMLElement> | undefined> =
    viewChild<ElementRef<HTMLElement>>('section');
  protected readonly activeIndex: WritableSignal<number> = signal(0);
  protected readonly progress: WritableSignal<number> = signal(0);
  protected readonly experiences: Signal<Experience[]> = signal<Experience[]>([
    {
      id: 1,
      company: 'NovaTech',
      logo: 'assets/logos/novatech.svg',
      title: 'Développeur Front-End Angular',
      description:
        'Développement d’un portail métier destiné aux équipes internes. Mise en place d’interfaces performantes et amélioration continue de l’expérience utilisateur.',
      technologies: ['Angular', 'TypeScript', 'RxJS', 'SCSS'],
    },
    {
      id: 2,
      company: 'DataSphere',
      logo: 'assets/logos/datasphere.svg',
      title: 'Développeur Full Stack',
      description:
        'Conception de services web et d’API REST pour des applications de gestion. Participation aux choix techniques et aux revues de code.',
      technologies: ['Angular', 'Node.js', 'NestJS', 'PostgreSQL'],
    },
    {
      id: 3,
      company: 'GreenSoft',
      logo: 'assets/logos/greensoft.svg',
      title: 'Ingénieur Logiciel',
      description:
        'Création de solutions logicielles pour le suivi d’indicateurs environnementaux avec intégration de tableaux de bord interactifs.',
      technologies: ['Angular', 'C#', '.NET', 'Azure'],
    },
    {
      id: 4,
      company: 'CloudVision',
      logo: 'assets/logos/cloudvision.svg',
      title: 'Lead Développeur Front',
      description:
        'Encadrement technique d’une équipe front-end et définition d’architectures modernes pour plusieurs produits SaaS.',
      technologies: ['Angular', 'Nx', 'Jest', 'Docker'],
    },
    {
      id: 5,
      company: 'TechFactory',
      logo: 'assets/logos/techfactory.svg',
      title: 'Ingénieur Développement',
      description:
        'Développement de fonctionnalités stratégiques et optimisation des performances applicatives sur des projets à forte visibilité.',
      technologies: ['Angular', 'Spring Boot', 'Kubernetes', 'GitLab CI'],
    },
  ]);
  protected isInView: WritableSignal<boolean> = signal(false);
  private readonly platformId: Object = inject(PLATFORM_ID);

  constructor() {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }
    afterNextRender(() => {
      this.initializeObserver();
      this.initializeScrollProgress();
    });
  }

  private initializeObserver(): void {
    this.cards().forEach((card, index) => {
      card.nativeElement.dataset['index'] = `${index}`;
    });
    const updateActiveCard = (): void => {
      const viewportCenter = window.innerHeight / 2;
      let closestIndex = 0;
      this.cards().forEach((card, index) => {
        const cardRect: DOMRect = card.nativeElement.getBoundingClientRect();
        const cardCenter = cardRect.top + cardRect.height / 2;
        const isCardAboveScreenCenter = cardCenter < viewportCenter;
        if (isCardAboveScreenCenter) {
          closestIndex = index;
        }
      });
      this.activeIndex.set(closestIndex);
    };
    updateActiveCard();
    window.addEventListener('scroll', updateActiveCard, { passive: true });
    window.addEventListener('resize', updateActiveCard);
  }

  private initializeScrollProgress(): void {
    const updateProgress = () => {
      const section: HTMLElement | undefined = this.section()?.nativeElement;
      if (!section) {
        return;
      }
      const rect: DOMRect = section.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const start = viewportHeight;
      const end = -rect.height;
      const progress = ((start - rect.top) / (start - end)) * 100;
      this.progress.set(Math.max(0, Math.min(progress, 100)));
    };
    updateProgress();
    window.addEventListener('scroll', updateProgress, { passive: true });
    window.addEventListener('resize', updateProgress);
  }
}
