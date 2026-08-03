import { Component, inject, Signal, signal, WritableSignal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { toSignal } from '@angular/core/rxjs-interop';
import { ThemeToggle } from './theme-toggle/theme-toggle';
import { NavLink } from '../../../models/nav-link';

@Component({
  selector: 'header-nav-links',
  imports: [ThemeToggle],
  templateUrl: './header-nav-links.html',
  styleUrl: './header-nav-links.scss',
})
export class HeaderNavLinks {
  protected readonly isMenuOpened: WritableSignal<boolean> = signal(false);
  private readonly http: HttpClient = inject(HttpClient);
  protected readonly navLinks: Signal<NavLink[]> = toSignal(
    this.http.get<NavLink[]>('data/nav-links.json'),
    { initialValue: [] },
  );

  protected toggleMenu(): void {
    this.isMenuOpened.update((isMenuOpened) => !isMenuOpened);
    document.body.classList.toggle('lock-scroll');
  }

  protected closeMenu(): void {
    this.isMenuOpened.set(false);
    document.body.classList.remove('lock-scroll');
  }
}
