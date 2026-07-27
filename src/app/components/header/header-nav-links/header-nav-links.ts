import { Component, signal } from '@angular/core';
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
  protected isMenuOpened = signal(false);
  protected navLinks: NavLink[] = [
    { id: 1, href: '/', text: 'Accueil' },
    { id: 2, href: '#about', text: 'À propos' },
    { id: 3, href: '#skills', text: 'Compétences' },
    { id: 4, href: '/', text: 'Expériences' },
    { id: 5, href: '/', text: 'Projets' },
    { id: 6, href: '/', text: 'Études' },
    { id: 7, href: '/', text: 'Contact' },
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
