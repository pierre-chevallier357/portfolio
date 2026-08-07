import { NgOptimizedImage } from '@angular/common';
import { Component, computed, inject, Signal, signal, WritableSignal } from '@angular/core';
import { InView } from '../../shared/in-view/in-view';
import { LanguageStore } from '../../core/language/language-store';
import { HomeTitle } from './home-title/home-title';
import { ContentProvider } from '../../content/content-provider';

@Component({
  selector: 'portfolio-home',
  imports: [NgOptimizedImage, InView, HomeTitle],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
  protected readonly isInView: WritableSignal<boolean> = signal(false);
  private readonly languageStore: LanguageStore = inject(LanguageStore);
  protected readonly portraitAlt: Signal<string> = computed(() =>
    this.languageStore.isFrench() ? 'Portrait de Pierre' : 'Portrait of Pierre',
  );
  private readonly contentProvider: ContentProvider = inject(ContentProvider);
  protected readonly aboutLabel: Signal<string> = this.contentProvider.getSectionTitle('about');
}
