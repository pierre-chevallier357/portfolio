import { Component, computed, inject, Signal } from '@angular/core';
import { ThemeService } from '../../../services/theme/theme';
import { LanguageService } from '../../../services/language/language';
import { Theme } from '../../../models/theme';

@Component({
  selector: 'theme-toggle',
  templateUrl: './theme-toggle.html',
  styleUrl: './theme-toggle.scss',
})
export class ThemeToggle {
  private readonly themeService: ThemeService = inject(ThemeService);
  protected readonly theme: Signal<Theme> = this.themeService.theme.asReadonly();
  private readonly languageService: LanguageService = inject(LanguageService);
  protected readonly ariaLabel: Signal<string> = computed(() => {
    const isFrench: boolean = this.languageService.isFrench();
    if (this.theme() === 'dark') {
      return isFrench ? 'Activer le mode clair' : 'Switch to light mode';
    }
    return isFrench ? 'Activer le mode sombre' : 'Switch to dark mode';
  });
  protected readonly label: Signal<string> = computed(() => {
    const isFrench: boolean = this.languageService.isFrench();
    if (this.theme() === 'dark') {
      return isFrench ? 'Mode clair' : 'Light mode';
    }
    return isFrench ? 'Mode sombre' : 'Dark mode';
  });

  protected toggleTheme(): void {
    this.themeService.toggleTheme();
  }
}
