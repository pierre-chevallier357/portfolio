import {
  computed,
  effect,
  inject,
  Injectable,
  Signal,
  signal,
  WritableSignal,
} from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { Language } from './language';

const STORAGE_KEY: string = 'language';

const TITLE_BY_LANGUAGE: Record<string, string> = {
  fr: 'Pierre Chevallier',
  en: 'Pierre Chevallier',
};

const DESCRIPTION_BY_LANGUAGE: Record<string, string> = {
  fr: 'Portfolio de Pierre Chevallier',
  en: 'Portfolio of Pierre Chevallier',
};

@Injectable({
  providedIn: 'root',
})
export class LanguageStore {
  public readonly language: WritableSignal<Language> = signal<Language>(this.getStoredLanguage());
  public readonly languages: Language[] = [
    { code: 'fr', label: 'Français' },
    { code: 'en', label: 'English' },
  ];
  public readonly isFrench: Signal<boolean> = computed(() => this.language()?.code === 'fr');
  public readonly DEFAULT_LANGUAGE: Language = { code: 'fr', label: 'Français' };
  private readonly titleService: Title = inject(Title);
  private readonly metaService: Meta = inject(Meta);

  constructor() {
    effect(() => {
      const language: Language = this.language();
      if (this.isBrowser()) {
        document.documentElement.setAttribute('lang', language?.code);
      }
      this.titleService.setTitle(TITLE_BY_LANGUAGE[language?.code]);
      this.metaService.updateTag({
        name: 'description',
        content: DESCRIPTION_BY_LANGUAGE[language?.code],
      });
    });
  }

  public setLanguage(language: Language): void {
    this.language.set(language);
    if (this.isBrowser()) {
      window.localStorage.setItem(STORAGE_KEY, language.code);
    }
  }

  private getStoredLanguage(): Language {
    if (!this.isBrowser()) {
      return this.DEFAULT_LANGUAGE;
    }
    const stored: string | null = window.localStorage.getItem(STORAGE_KEY);
    return stored === 'fr'
      ? { code: 'fr', label: 'Français' }
      : stored === 'en'
        ? { code: 'en', label: 'English' }
        : this.DEFAULT_LANGUAGE;
  }

  private isBrowser(): boolean {
    return typeof window !== 'undefined';
  }
}
