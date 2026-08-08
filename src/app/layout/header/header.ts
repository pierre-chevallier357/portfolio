import {
  Component,
  computed,
  inject,
  PLATFORM_ID,
  Signal,
  signal,
  WritableSignal,
} from '@angular/core';
import { isPlatformBrowser, NgOptimizedImage } from '@angular/common';
import { toSignal } from '@angular/core/rxjs-interop';
import { fromEvent, map } from 'rxjs';
import { startWith } from 'rxjs/operators';
import { LanguageStore } from '../../core/language/language-store';
import { LanguageToggle } from './language-toggle/language-toggle';
import { ThemeToggle } from './theme-toggle/theme-toggle';
import { ContentProvider } from '../../content/content-provider';
import { HeaderContent } from '../../content/header-content';

@Component({
  selector: 'portfolio-header',
  imports: [NgOptimizedImage, LanguageToggle, ThemeToggle],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  protected readonly isMenuOpened: WritableSignal<boolean> = signal(false);
  private readonly platformId: object = inject(PLATFORM_ID);
  private readonly isBrowser: boolean = isPlatformBrowser(this.platformId);
  private readonly languageStore: LanguageStore = inject(LanguageStore);
  protected readonly logoAlt: Signal<string> = computed(() =>
    this.languageStore.isFrench() ? 'Dessin simplifié de Pierre' : 'Simplified drawing of Pierre',
  );
  protected readonly menuButtonLabel: Signal<string> = computed(() => {
    const isFrench: boolean = this.languageStore.isFrench();
    if (this.isMenuOpened()) {
      return isFrench ? 'Fermer le menu' : 'Close menu';
    }
    return isFrench ? 'Ouvrir le menu' : 'Open menu';
  });
  private readonly remSize: Signal<number> = computed(() =>
    parseFloat(getComputedStyle(document.documentElement).fontSize),
  );
  private readonly scrollThresholdInPixels: number = this.isBrowser ? 5 * this.remSize() : 80; // 80 px is the fallback for SSR
  protected readonly hasScrolledAfterThreshold: Signal<boolean> = this.isBrowser
    ? toSignal(
        fromEvent(window, 'scroll').pipe(
          map(() => window.scrollY > this.scrollThresholdInPixels),
          startWith(window.scrollY > this.scrollThresholdInPixels),
        ),
        { initialValue: false },
      )
    : signal(false);
  private readonly contentProvider: ContentProvider = inject(ContentProvider);
  protected readonly navLinks: Signal<HeaderContent> = this.contentProvider.getHeaderContent();
  protected readonly homeSectionTitle: Signal<string> = this.contentProvider.getSectionTitle('home');

  protected toggleMenu(): void {
    this.isMenuOpened.update((isMenuOpened) => !isMenuOpened);
    document.body.classList.toggle('lock-scroll');
  }

  protected closeMenu(): void {
    this.isMenuOpened.set(false);
    document.body.classList.remove('lock-scroll');
  }
}
