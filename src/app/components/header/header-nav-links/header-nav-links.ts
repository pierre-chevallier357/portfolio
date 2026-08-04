import { Component, computed, inject, Signal, signal, WritableSignal } from '@angular/core';
import { ThemeToggle } from './theme-toggle/theme-toggle';
import { LanguageToggle } from './language-toggle/language-toggle';
import { NavLink } from '../../../models/nav-link';
import { ContentService } from '../../../services/content/content';
import { LanguageService } from '../../../services/language/language';

@Component({
  selector: 'header-nav-links',
  imports: [ThemeToggle, LanguageToggle],
  templateUrl: './header-nav-links.html',
  styleUrl: './header-nav-links.scss',
})
export class HeaderNavLinks {
  protected readonly isMenuOpened: WritableSignal<boolean> = signal(false);
  private readonly contentService: ContentService = inject(ContentService);
  private readonly languageService: LanguageService = inject(LanguageService);
  protected readonly navLinks: Signal<NavLink[]> = this.contentService.getNavLinks();
  protected readonly menuButtonLabel: Signal<string> = computed(() => {
    const isFrench: boolean = this.languageService.isFrench();
    if (this.isMenuOpened()) {
      return isFrench ? 'Fermer le menu' : 'Close menu';
    }
    return isFrench ? 'Ouvrir le menu' : 'Open menu';
  });

  protected toggleMenu(): void {
    this.isMenuOpened.update((isMenuOpened) => !isMenuOpened);
    document.body.classList.toggle('lock-scroll');
  }

  protected closeMenu(): void {
    this.isMenuOpened.set(false);
    document.body.classList.remove('lock-scroll');
  }
}
