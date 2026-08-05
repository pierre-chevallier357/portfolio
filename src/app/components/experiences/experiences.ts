import {
  afterNextRender,
  Component,
  computed,
  DestroyRef,
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
import { Experience } from '../../models/experience';
import { TextProvider } from '../../services/text-provider/text-provider';

@Component({
  selector: 'experiences',
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
  private readonly textProvider: TextProvider = inject(TextProvider);
  protected readonly experiences: Signal<Experience[]> = this.textProvider.getExperiences();
  protected readonly title: Signal<string> = this.textProvider.getNavLinkText('experiences');
  private readonly cardsContainerHeight: WritableSignal<number> = signal(0);
  private readonly firstCardHeight: WritableSignal<number> = signal(0);
  protected readonly timelineHeight: Signal<number> = computed(
    () => this.cardsContainerHeight() - this.firstCardHeight(),
  );
  protected readonly timelineStartingPosition: Signal<number> = computed(
    () => this.firstCardHeight() / 2,
  );
  private resizeObserver?: ResizeObserver;
  private readonly platformId: object = inject(PLATFORM_ID);
  private readonly destroyRef: DestroyRef = inject(DestroyRef);

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
    const container: HTMLElement = this.cardsContainer().nativeElement;
    const firstCard: HTMLElement | undefined = this.cards()[0]?.nativeElement;
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

    this.destroyRef.onDestroy(() => {
      this.resizeObserver?.disconnect();
      window.removeEventListener('load', updateMeasurements);
      window.removeEventListener('resize', updateMeasurements);
    });
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

    this.destroyRef.onDestroy(() => {
      window.removeEventListener('scroll', updateActiveCard);
      window.removeEventListener('resize', updateActiveCard);
    });
  }
}
