import { NgTemplateOutlet } from '@angular/common';
import { Component, computed, inject, Signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { SelfWritingText } from '../self-writing-text/self-writing-text';
import { LanguageStore } from '../../../core/language/language-store';
import { ContentProvider } from '../../../content/content-provider';
import { HomeContent } from '../../../content/home-content';

@Component({
  selector: 'h1[portfolioHomeTitle]',
  imports: [SelfWritingText, NgTemplateOutlet],
  templateUrl: './home-title.html',
  styleUrl: './home-title.scss',
})
export class HomeTitle {
  private readonly languageStore: LanguageStore = inject(LanguageStore);
  private readonly contentProvider: ContentProvider = inject(ContentProvider);
  protected readonly homeTitle: Signal<HomeContent> = this.contentProvider.getHomeContent();
  private readonly typewriterWords: Signal<string[]> = toSignal(
    this.contentProvider.getTypewriterContent$(),
    { initialValue: [] },
  );
  // Every possible fully-typed phrase, used only to render hidden "ghost" variants of the
  // heading (see template/styles) so its worst-case wrapped height can be reserved in pure
  // CSS, without ever reserving width.
  protected readonly ghostPhrases: Signal<string[]> = computed(() =>
    this.typewriterWords().map((word) =>
      this.buildTypewriterPhrase(this.homeTitle().developer, word, this.languageStore.isFrench()),
    ),
  );

  private buildTypewriterPhrase(developer: string, word: string, isFrench: boolean): string {
    return isFrench ? `${developer} ${word}` : `${word} ${developer}`;
  }
}
