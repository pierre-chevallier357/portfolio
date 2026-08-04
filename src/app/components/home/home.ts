import { NgOptimizedImage } from '@angular/common';
import { Component, computed, inject, Signal, signal, WritableSignal } from '@angular/core';
import { SelfWritingText } from './self-writing-text/self-writing-text';
import { InView } from '../../directives/in-view/in-view';
import { ThemeService } from '../../services/theme/theme';
import { LanguageService } from '../../services/language/language';

@Component({
  selector: 'home',
  imports: [NgOptimizedImage, SelfWritingText, InView],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
  protected readonly isDarkMode: Signal<boolean> = inject(ThemeService).isDarkMode;
  protected readonly isInView: WritableSignal<boolean> = signal(false);
  private readonly languageService: LanguageService = inject(LanguageService);
  protected readonly starAlt: Signal<string> = computed(() =>
    this.languageService.isFrench() ? 'Étoile' : 'Star',
  );
  protected readonly portraitAlt: Signal<string> = computed(() =>
    this.languageService.isFrench() ? 'Portrait de Pierre' : 'Portrait of Pierre',
  );
}
