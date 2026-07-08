import { effect, Injectable, signal } from '@angular/core';

export type Theme = 'light' | 'dark';

const STORAGE_KEY = 'theme';

/**
 * Tracks the active light/dark theme and keeps `<html data-theme>` in sync.
 *
 * Defaults to the OS preference (`prefers-color-scheme`) and always follows
 * it live. `toggleTheme` lets the user manually override that for the current
 * session; the override is persisted to `localStorage` but is cleared again
 * as soon as the OS preference changes, so the OS setting always wins back.
 */
@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private readonly darkModeQuery = this.isBrowser() ? window.matchMedia('(prefers-color-scheme: dark)') : null;

  public readonly theme = signal<Theme>(this.getInitialTheme());

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
    const stored = window.localStorage.getItem(STORAGE_KEY);
    return stored === 'dark' || stored === 'light' ? stored : null;
  }

  private isBrowser(): boolean {
    return typeof window !== 'undefined';
  }
}
