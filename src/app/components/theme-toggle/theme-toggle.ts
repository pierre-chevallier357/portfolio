import {Component, inject, WritableSignal} from '@angular/core';
import {ThemeService} from '../../services/theme/theme';
import {Theme} from '../../models/theme';

@Component({
  selector: 'theme-toggle',
  templateUrl: './theme-toggle.html',
  styleUrl: './theme-toggle.scss',
})
export class ThemeToggle {
  private readonly themeService: ThemeService = inject(ThemeService);
  protected readonly theme: WritableSignal<Theme> = this.themeService.theme;

  protected toggleTheme(): void {
    this.themeService.toggleTheme();
  }
}
