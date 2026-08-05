import { Component, computed, inject, Signal } from '@angular/core';
import { LanguageStore } from '../../../core/language-store';
import { Language } from '../../../core/language';

@Component({
  selector: 'portfolio-language-toggle',
  templateUrl: './language-toggle.html',
  styleUrl: './language-toggle.scss',
})
export class LanguageToggle {
  private readonly languageStore: LanguageStore = inject(LanguageStore);
  protected readonly language: Signal<Language> = this.languageStore.language.asReadonly();
  protected readonly label: Signal<string> = computed(() =>
    this.language() === 'fr' ? 'English' : 'Français',
  );

  protected toggleLanguage(): void {
    this.languageStore.toggleLanguage();
  }
}
