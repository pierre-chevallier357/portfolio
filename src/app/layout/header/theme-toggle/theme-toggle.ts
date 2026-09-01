import { Component, computed, inject, output, OutputEmitterRef, Signal } from '@angular/core';
import { ThemeStore } from '../../../core/theme/theme-store';
import { LanguageStore } from '../../../core/language/language-store';
import { Theme } from '../../../core/theme/theme';

@Component({
  selector: 'portfolio-theme-toggle',
  templateUrl: './theme-toggle.html',
})
export class ThemeToggle {
  public readonly clicked: OutputEmitterRef<void> = output<void>();
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

  protected toggleTheme(): void {
    this.clicked.emit();
    this.themeStore.toggleTheme();
  }
}
