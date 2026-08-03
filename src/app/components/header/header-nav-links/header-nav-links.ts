import { Component, inject, Signal, signal, WritableSignal } from '@angular/core';
import { ThemeToggle } from './theme-toggle/theme-toggle';
import { NavLink } from '../../../models/nav-link';
import { ContentService } from '../../../services/content/content';

@Component({
  selector: 'header-nav-links',
  imports: [ThemeToggle],
  templateUrl: './header-nav-links.html',
  styleUrl: './header-nav-links.scss',
})
export class HeaderNavLinks {
  protected readonly isMenuOpened: WritableSignal<boolean> = signal(false);
  private readonly contentService: ContentService = inject(ContentService);
  protected readonly navLinks: Signal<NavLink[]> = this.contentService.getNavLinks();

  protected toggleMenu(): void {
    this.isMenuOpened.update((isMenuOpened) => !isMenuOpened);
    document.body.classList.toggle('lock-scroll');
  }

  protected closeMenu(): void {
    this.isMenuOpened.set(false);
    document.body.classList.remove('lock-scroll');
  }
}
