import {Component, computed, ElementRef, inject, input, InputSignal, Signal, viewChild,} from '@angular/core';
import {Mission} from '../../../content/experience-content';
import {LanguageStore} from '../../../core/language/language-store';

@Component({
  selector: 'portfolio-timeline-entry',
  templateUrl: './timeline-entry.html',
  styleUrl: './timeline-entry.scss',
})
export class TimelineEntry {
  public readonly mission: InputSignal<Mission> = input.required<Mission>();
  public readonly metaElement: Signal<ElementRef<HTMLElement>> =
    viewChild.required<ElementRef<HTMLElement>>('meta');
  private readonly languageStore: LanguageStore = inject(LanguageStore);
  protected readonly seeMoreLabel: Signal<string> = computed(() =>
    this.languageStore.isFrench() ? 'Voir plus' : 'See more',
  );
}
