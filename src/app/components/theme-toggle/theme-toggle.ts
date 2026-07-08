import { Component, inject } from '@angular/core';
import { ThemeService } from '../../services/theme/theme';

@Component({
  selector: 'theme-toggle',
  imports: [],
  templateUrl: './theme-toggle.html',
  styleUrl: './theme-toggle.scss',
})
export class ThemeToggle {
  private readonly themeService = inject(ThemeService);
  protected readonly theme = this.themeService.theme;

  protected toggleTheme(): void {
    this.themeService.toggleTheme();
  }
}
