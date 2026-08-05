import { Component, inject, Signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { switchMap } from 'rxjs';
import { TypewriterEffect } from '../typewriter-effect/typewriter-effect';
import { ThemeStore } from '../../../core/theme/theme-store';
import { TextProvider } from '../../../content/text-provider';
import { Title } from '../../../content/title';
import { LanguageStore } from '../../../core/language/language-store';

@Component({
  selector: 'portfolio-self-writing-text',
  templateUrl: './self-writing-text.html',
  styleUrl: './self-writing-text.scss',
})
export class SelfWritingText {
  protected readonly isDarkMode: Signal<boolean> = inject(ThemeStore).isDarkMode;
  private readonly typewriterEffect: TypewriterEffect = inject(TypewriterEffect);
  private readonly textProvider: TextProvider = inject(TextProvider);
  protected readonly typedText: Signal<string> = toSignal(
    this.textProvider
      .getTypewriterWords$()
      .pipe(switchMap((words) => this.typewriterEffect.getTypewriterEffect(words))),
    { initialValue: '' },
  );
  protected readonly homeTitle: Signal<Title> = this.textProvider.getHomeTitle();
  private readonly languageStore: LanguageStore = inject(LanguageStore);
  protected readonly isFrench: Signal<boolean> = this.languageStore.isFrench;
}
