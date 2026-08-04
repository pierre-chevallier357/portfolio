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
import { Language } from '../../models/language';

const STORAGE_KEY = 'language';
const DEFAULT_LANGUAGE: Language = 'fr';

const TITLE_BY_LANGUAGE: Record<Language, string> = {
  fr: 'Pierre Chevallier',
  en: 'Pierre Chevallier',
};

const DESCRIPTION_BY_LANGUAGE: Record<Language, string> = {
  fr: 'Portfolio de Pierre Chevallier',
  en: 'Portfolio of Pierre Chevallier',
};

@Injectable({
  providedIn: 'root',
})
export class LanguageService {
  public readonly language: WritableSignal<Language> = signal<Language>(this.getInitialLanguage());
  public readonly isFrench: Signal<boolean> = computed(() => this.language() === 'fr');
  private readonly titleService: Title = inject(Title);
  private readonly metaService: Meta = inject(Meta);

  constructor() {
    effect(() => {
      const language: Language = this.language();
      if (this.isBrowser()) {
        document.documentElement.setAttribute('lang', language);
      }
      this.titleService.setTitle(TITLE_BY_LANGUAGE[language]);
      this.metaService.updateTag({
        name: 'description',
        content: DESCRIPTION_BY_LANGUAGE[language],
      });
    });
  }

  public toggleLanguage(): void {
    const nextLanguage: Language = this.language() === 'fr' ? 'en' : 'fr';
    this.language.set(nextLanguage);
    if (this.isBrowser()) {
      window.localStorage.setItem(STORAGE_KEY, nextLanguage);
    }
  }

  private getInitialLanguage(): Language {
    return this.getStoredLanguage() ?? DEFAULT_LANGUAGE;
  }

  private getStoredLanguage(): Language | null {
    if (!this.isBrowser()) {
      return null;
    }
    const stored: string | null = window.localStorage.getItem(STORAGE_KEY);
    return stored === 'fr' || stored === 'en' ? stored : null;
  }

  private isBrowser(): boolean {
    return typeof window !== 'undefined';
  }
}
