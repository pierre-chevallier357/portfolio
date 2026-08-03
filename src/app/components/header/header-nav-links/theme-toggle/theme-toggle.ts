import { Component, inject, Signal } from '@angular/core';
import { ThemeService } from '../../../../services/theme/theme';
import { Theme } from '../../../../models/theme';

@Component({
  selector: 'theme-toggle',
  templateUrl: './theme-toggle.html',
  styleUrl: './theme-toggle.scss',
})
export class ThemeToggle {
  private readonly themeService: ThemeService = inject(ThemeService);
  protected readonly theme: Signal<Theme> = this.themeService.theme.asReadonly();

  protected toggleTheme(): void {
    this.themeService.toggleTheme();
  }
}
