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
import { isPlatformBrowser } from '@angular/common';
import { Timeline } from './timeline/timeline';
import { InView } from '../../directives/in-view/in-view';

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
  protected readonly cardsContainer: Signal<ElementRef<HTMLElement> | undefined> =
    viewChild<ElementRef<HTMLElement>>('cardsContainer');
  protected readonly activeIndex: WritableSignal<number> = signal(0);
  protected readonly isInView: WritableSignal<boolean> = signal(false);
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
  private readonly cardsContainerHeight: WritableSignal<number> = signal(0);
  private readonly firstCardHeight: WritableSignal<number> = signal(0);
  protected readonly timelineHeight: Signal<number> = computed(
    () => this.cardsContainerHeight() - this.firstCardHeight(),
  );
  protected readonly timelineStartingPosition: Signal<number> = computed(
    () => this.firstCardHeight() / 2,
  );
  private resizeObserver!: ResizeObserver;
  private readonly platformId: Object = inject(PLATFORM_ID);

  constructor() {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }
    afterNextRender(() => {
      this.initializeCardsMeasurements();
      this.initializeDotsActivation();
    });
  }

  private initializeCardsMeasurements(): void {
    const container: HTMLElement | undefined = this.cardsContainer()?.nativeElement;
    const firstCard: HTMLElement = this.cards()[0]?.nativeElement;
    if (!container) {
      return;
    }
    const updateMeasurements = () => {
      this.cardsContainerHeight.set(container.offsetHeight);
      this.firstCardHeight.set(firstCard?.offsetHeight ?? 0);
    };
    updateMeasurements();
    this.resizeObserver = new ResizeObserver(() => {
      updateMeasurements();
    });
    this.resizeObserver.observe(container);
    if (firstCard) {
      this.resizeObserver.observe(firstCard);
    }
    window.addEventListener('load', updateMeasurements);
    window.addEventListener('resize', updateMeasurements);
  }

  private initializeDotsActivation(): void {
    this.cards().forEach((card, index) => {
      card.nativeElement.dataset['index'] = `${index}`;
    });
    const updateActiveCard = (): void => {
      const viewportCenter = window.innerHeight / 2;
      let activeIndex = 0;
      this.cards().forEach((card, index) => {
        const cardRect: DOMRect = card.nativeElement.getBoundingClientRect();
        const cardCenter = cardRect.top + cardRect.height / 2;
        if (cardCenter < viewportCenter) {
          activeIndex = index;
        }
      });
      this.activeIndex.set(activeIndex);
    };
    updateActiveCard();
    window.addEventListener('scroll', updateActiveCard, { passive: true });
    window.addEventListener('resize', updateActiveCard);
  }
}
