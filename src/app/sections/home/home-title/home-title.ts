import { NgTemplateOutlet } from '@angular/common';
import { Component, computed, inject, Signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { SelfWritingText } from '../self-writing-text/self-writing-text';
import { ThemeStore } from '../../../core/theme/theme-store';
import { LanguageStore } from '../../../core/language/language-store';
import { TextProvider } from '../../../content/text-provider';
import { Title } from '../../../content/title';

@Component({
  selector: 'h1[portfolioHomeTitle]',
  imports: [SelfWritingText, NgTemplateOutlet],
  templateUrl: './home-title.html',
  styleUrl: './home-title.scss',
})
export class HomeTitle {
  protected readonly isDarkMode: Signal<boolean> = inject(ThemeStore).isDarkMode;
  private readonly languageStore: LanguageStore = inject(LanguageStore);
  private readonly textProvider: TextProvider = inject(TextProvider);
  protected readonly title: Signal<Title> = this.textProvider.getHomeTitle();
  private readonly typewriterWords: Signal<string[]> = toSignal(
    this.textProvider.getTypewriterWords$(),
    { initialValue: [] },
  );
  // Every possible fully-typed phrase, used only to render hidden "ghost" variants of the
  // heading (see template/styles) so its worst-case wrapped height can be reserved in pure
  // CSS, without ever reserving width.
  protected readonly ghostPhrases: Signal<string[]> = computed(() =>
    this.typewriterWords().map((word) =>
      this.buildTypewriterPhrase(this.title().developer, word, this.languageStore.isFrench()),
    ),
  );

  private buildTypewriterPhrase(developer: string, word: string, isFrench: boolean): string {
    return isFrench ? `${developer} ${word}` : `${word} ${developer}`;
  }
}
