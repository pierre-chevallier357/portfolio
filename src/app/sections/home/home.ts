import { NgOptimizedImage } from '@angular/common';
import { Component, computed, inject, Signal, signal, WritableSignal } from '@angular/core';
import { SelfWritingText } from './self-writing-text/self-writing-text';
import { InView } from '../../shared/in-view/in-view';
import { ThemeStore } from '../../core/theme/theme-store';
import { LanguageStore } from '../../core/language/language-store';
import { TextProvider } from '../../content/text-provider';
import { HomeTitle } from '../../content/home-title';

@Component({
  selector: 'portfolio-home',
  imports: [NgOptimizedImage, SelfWritingText, InView],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
  protected readonly isDarkMode: Signal<boolean> = inject(ThemeStore).isDarkMode;
  protected readonly isInView: WritableSignal<boolean> = signal(false);
  private readonly languageStore: LanguageStore = inject(LanguageStore);
  protected readonly portraitAlt: Signal<string> = computed(() =>
    this.languageStore.isFrench() ? 'Portrait de Pierre' : 'Portrait of Pierre',
  );
  private readonly textProvider: TextProvider = inject(TextProvider);
  protected readonly title: Signal<HomeTitle> = this.textProvider.getHomeTitle();
}
