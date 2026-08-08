import {
  afterRenderEffect,
  Component,
  computed,
  ElementRef,
  inject,
  Signal,
  signal,
  viewChild,
  viewChildren,
  WritableSignal,
} from '@angular/core';
import { Timeline } from './timeline/timeline';
import { InView } from '../../shared/in-view/in-view';
import { ExperienceContent } from '../../content/experience-content';
import { ContentProvider } from '../../content/content-provider';

@Component({
  selector: 'portfolio-experiences',
  imports: [InView, Timeline],
  templateUrl: './experiences.html',
  styleUrl: './experiences.scss',
})
export class Experiences {
  protected readonly cards: Signal<readonly ElementRef<HTMLElement>[]> =
    viewChildren<ElementRef<HTMLElement>>('card');
  protected readonly cardsContainer: Signal<ElementRef<HTMLElement>> =
    viewChild.required<ElementRef<HTMLElement>>('cardsContainer');
  protected readonly activeIndex: WritableSignal<number> = signal(0);
  protected readonly isInView: WritableSignal<boolean> = signal(false);
  private readonly contentProvider: ContentProvider = inject(ContentProvider);
  protected readonly experiences: Signal<ExperienceContent> =
    this.contentProvider.getExperiencesContent();
  protected readonly title: Signal<string> = this.contentProvider.getSectionTitle('experiences');
  private readonly cardsContainerHeight: WritableSignal<number> = signal(0);
  private readonly firstCardHeight: WritableSignal<number> = signal(0);
  protected readonly timelineHeight: Signal<number> = computed(
    () => this.cardsContainerHeight() - this.firstCardHeight(),
  );
  protected readonly timelineStartingPosition: Signal<number> = computed(
    () => this.firstCardHeight() / 2,
  );
  constructor() {
    afterRenderEffect((onCleanup) => {
      const cards: readonly ElementRef<HTMLElement>[] = this.cards();
      const container: ElementRef<HTMLElement> | undefined = this.cardsContainer();
      const firstCard: HTMLElement | undefined = cards[0]?.nativeElement;
      if (!container || !firstCard) {
        return;
      }
      this.initializeCardsMeasurements(container.nativeElement, firstCard, onCleanup);
    });
    afterRenderEffect((onCleanup) => {
      const cards: readonly ElementRef<HTMLElement>[] = this.cards();
      if (cards.length === 0) {
        return;
      }
      this.initializeDotsActivation(cards, onCleanup);
    });
  }

  private initializeCardsMeasurements(
    container: HTMLElement,
    firstCard: HTMLElement,
    onCleanup: (cleanupFn: () => void) => void,
  ): void {
    const updateMeasurements = () => {
      this.cardsContainerHeight.set(container.offsetHeight);
      this.firstCardHeight.set(firstCard.offsetHeight);
    };
    updateMeasurements();
    const resizeObserver: ResizeObserver = new ResizeObserver(() => {
      updateMeasurements();
    });
    resizeObserver.observe(container);
    resizeObserver.observe(firstCard);
    window.addEventListener('resize', updateMeasurements);

    onCleanup(() => {
      resizeObserver.disconnect();
      window.removeEventListener('resize', updateMeasurements);
    });
  }

  private initializeDotsActivation(
    cards: readonly ElementRef<HTMLElement>[],
    onCleanup: (cleanupFn: () => void) => void,
  ): void {
    cards.forEach((card, index) => {
      card.nativeElement.dataset['index'] = `${index}`;
    });
    const updateActiveCard = (): void => {
      const viewportCenter = window.innerHeight / 2;
      let activeIndex: number = 0;
      cards.forEach((card, index) => {
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

    onCleanup(() => {
      window.removeEventListener('scroll', updateActiveCard);
      window.removeEventListener('resize', updateActiveCard);
    });
  }
}
