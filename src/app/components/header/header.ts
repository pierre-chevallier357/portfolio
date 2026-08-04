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
import { LanguageService } from '../../services/language/language';
import { LanguageToggle } from './language-toggle/language-toggle';
import { ThemeToggle } from './theme-toggle/theme-toggle';
import { ContentService } from '../../services/content/content';
import { NavLink } from '../../models/nav-link';

@Component({
  selector: 'header-menu',
  imports: [NgOptimizedImage, LanguageToggle, ThemeToggle],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  protected readonly isMenuOpened: WritableSignal<boolean> = signal(false);
  private readonly platformId: object = inject(PLATFORM_ID);
  private readonly isBrowser = isPlatformBrowser(this.platformId);
  private readonly languageService: LanguageService = inject(LanguageService);
  protected readonly logoAlt: Signal<string> = computed(() =>
    this.languageService.isFrench() ? 'Dessin simplifié de Pierre' : 'Simplified drawing of Pierre',
  );
  protected readonly menuButtonLabel: Signal<string> = computed(() => {
    const isFrench: boolean = this.languageService.isFrench();
    if (this.isMenuOpened()) {
      return isFrench ? 'Fermer le menu' : 'Close menu';
    }
    return isFrench ? 'Ouvrir le menu' : 'Open menu';
  });
  private readonly remSize: Signal<number> = computed(() =>
    parseFloat(getComputedStyle(document.documentElement).fontSize),
  );
  private readonly scrollThresholdInPixels = this.isBrowser ? 5 * this.remSize() : 80; // 80 px is the fallback for SSR
  protected readonly hasScrolledAfterThreshold: Signal<boolean> = this.isBrowser
    ? toSignal(
        fromEvent(window, 'scroll').pipe(
          map(() => window.scrollY > this.scrollThresholdInPixels),
          startWith(window.scrollY > this.scrollThresholdInPixels),
        ),
        { initialValue: false },
      )
    : signal(false);
  private readonly contentService: ContentService = inject(ContentService);
  protected readonly navLinks: Signal<NavLink[]> = this.contentService.getNavLinks();

  protected toggleMenu(): void {
    this.isMenuOpened.update((isMenuOpened) => !isMenuOpened);
    // document.body.classList.toggle('lock-scroll'); // TODO add it back
  }

  protected closeMenu(): void {
    this.isMenuOpened.set(false);
    // document.body.classList.remove('lock-scroll'); // TODO add it back
  }
}
