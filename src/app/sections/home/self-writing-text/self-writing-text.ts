import { Component, inject, Signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { switchMap } from 'rxjs';
import { TypewriterEffect } from '../typewriter-effect/typewriter-effect.service';
import { ThemeStore } from '../../../core/theme-store';
import { TextProvider } from '../../../content/text-provider';
import { HomeTitle } from '../../../content/home-title';
import { LanguageStore } from '../../../core/language-store';

@Component({
  selector: 'self-writing-text',
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
  protected readonly homeTitle: Signal<HomeTitle> = this.textProvider.getHomeTitle();
  private readonly languageStore: LanguageStore = inject(LanguageStore);
  protected readonly isFrench: Signal<boolean> = this.languageStore.isFrench;
}
