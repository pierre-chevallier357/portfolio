import { Component, computed, inject, Signal } from '@angular/core';
import { LanguageStore } from '../../../services/language-store/language-store';
import { Language } from '../../../models/language';

@Component({
  selector: 'language-toggle',
  templateUrl: './language-toggle.html',
  styleUrl: './language-toggle.scss',
})
export class LanguageToggle {
  protected readonly label: Signal<string> = computed(() =>
    this.language() === 'fr' ? 'English' : 'Français',
  );
  private readonly languageStore: LanguageStore = inject(LanguageStore);
  protected readonly language: Signal<Language> = this.languageStore.language.asReadonly();

  protected toggleLanguage(): void {
    this.languageStore.toggleLanguage();
  }
}
