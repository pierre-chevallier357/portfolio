import { Component, computed, ElementRef, inject, input, InputSignal, Signal, viewChild } from '@angular/core';
import { Mission } from '../../../content/experience-content';
import { LanguageStore } from '../../../core/language/language-store';

@Component({
  selector: 'portfolio-mission-item',
  templateUrl: './mission-item.html',
  styleUrl: './mission-item.scss',
})
export class MissionItem {
  public readonly mission: InputSignal<Mission> = input.required<Mission>();
  public readonly metaInfoElement: Signal<ElementRef<HTMLElement>> =
    viewChild.required<ElementRef<HTMLElement>>('metaInfo');
  private readonly languageStore: LanguageStore = inject(LanguageStore);
  protected readonly seeMoreLabel: Signal<string> = computed(() =>
    this.languageStore.isFrench() ? 'Voir plus' : 'See more',
  );
}
