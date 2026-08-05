import { computed, effect, Injectable, Signal, signal, WritableSignal } from '@angular/core';
import { Theme } from '../../models/theme';

const STORAGE_KEY = 'theme';

@Injectable({
  providedIn: 'root',
})
export class ThemeStore {
  public readonly theme: WritableSignal<Theme> = signal<Theme>(this.getInitialTheme());
  public readonly isDarkMode: Signal<boolean> = computed(() => this.theme() === 'dark');
  private readonly darkModeQuery: MediaQueryList | null = this.isBrowser()
    ? window.matchMedia('(prefers-color-scheme: dark)')
    : null;

  constructor() {
    this.darkModeQuery?.addEventListener('change', (event) => {
      // A change in the OS setting always takes over, clearing any manual override.
      if (this.isBrowser()) {
        window.localStorage.removeItem(STORAGE_KEY);
      }
      this.theme.set(event.matches ? 'dark' : 'light');
    });

    effect(() => {
      if (this.isBrowser()) {
        document.documentElement.setAttribute('data-theme', this.theme());
      }
    });
  }

  public toggleTheme(): void {
    const nextTheme: Theme = this.theme() === 'dark' ? 'light' : 'dark';
    this.theme.set(nextTheme);
    window.localStorage.setItem(STORAGE_KEY, nextTheme);
  }

  private getInitialTheme(): Theme {
    return this.getStoredTheme() ?? (this.darkModeQuery?.matches ? 'dark' : 'light');
  }

  private getStoredTheme(): Theme | null {
    if (!this.isBrowser()) {
      return null;
    }
    const stored: string | null = window.localStorage.getItem(STORAGE_KEY);
    return stored === 'dark' || stored === 'light' ? stored : null;
  }

  private isBrowser(): boolean {
    return typeof window !== 'undefined';
  }
}
