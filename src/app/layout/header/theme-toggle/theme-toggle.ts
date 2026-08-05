import { Component, computed, inject, Signal } from '@angular/core';
import { ThemeStore } from '../../../core/theme-store';
import { LanguageStore } from '../../../core/language-store';
import { Theme } from '../../../core/theme';

@Component({
  selector: 'theme-toggle',
  templateUrl: './theme-toggle.html',
  styleUrl: './theme-toggle.scss',
})
export class ThemeToggle {
  private readonly themeStore: ThemeStore = inject(ThemeStore);
  protected readonly theme: Signal<Theme> = this.themeStore.theme.asReadonly();
  private readonly languageStore: LanguageStore = inject(LanguageStore);
  protected readonly ariaLabel: Signal<string> = computed(() => {
    const isFrench: boolean = this.languageStore.isFrench();
    if (this.theme() === 'dark') {
      return isFrench ? 'Activer le mode clair' : 'Switch to light mode';
    }
    return isFrench ? 'Activer le mode sombre' : 'Switch to dark mode';
  });
  protected readonly label: Signal<string> = computed(() => {
    const isFrench: boolean = this.languageStore.isFrench();
    if (this.theme() === 'dark') {
      return isFrench ? 'Mode clair' : 'Light mode';
    }
    return isFrench ? 'Mode sombre' : 'Dark mode';
  });

  protected toggleTheme(): void {
    this.themeStore.toggleTheme();
  }
}
