import { Component, computed, inject, Signal } from '@angular/core';
import { LanguageService } from '../../../../services/language/language';
import { Language } from '../../../../models/language';

@Component({
  selector: 'language-toggle',
  templateUrl: './language-toggle.html',
  styleUrl: './language-toggle.scss',
})
export class LanguageToggle {
  private readonly languageService: LanguageService = inject(LanguageService);
  protected readonly language: Signal<Language> = this.languageService.language.asReadonly();
  protected readonly label: Signal<string> = computed(() =>
    this.language() === 'fr' ? 'Anglais' : 'French',
  );

  protected toggleLanguage(): void {
    this.languageService.toggleLanguage();
  }
}
