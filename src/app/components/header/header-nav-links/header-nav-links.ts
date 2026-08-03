import { Component, signal, WritableSignal } from '@angular/core';
import { ThemeToggle } from './theme-toggle/theme-toggle';

interface NavLink {
  id: number;
  href: string;
  text: string;
}

@Component({
  selector: 'header-nav-links',
  imports: [ThemeToggle],
  templateUrl: './header-nav-links.html',
  styleUrl: './header-nav-links.scss',
})
export class HeaderNavLinks {
  protected readonly isMenuOpened: WritableSignal<boolean> = signal(false);
  protected readonly navLinks: NavLink[] = [
    { id: 1, href: '#home', text: 'Accueil' },
    { id: 2, href: '#about', text: 'À propos' },
    { id: 3, href: '#skills', text: 'Compétences' },
    { id: 4, href: '#experiences', text: 'Expériences' },
    { id: 5, href: '#projects', text: 'Projets' },
    { id: 6, href: '#education', text: 'Études' },
    { id: 7, href: '#contact', text: 'Contact' },
  ];

  protected toggleMenu(): void {
    this.isMenuOpened.update((isMenuOpened) => !isMenuOpened);
    document.body.classList.toggle('lock-scroll');
  }

  protected closeMenu(): void {
    this.isMenuOpened.set(false);
    document.body.classList.remove('lock-scroll');
  }
}
