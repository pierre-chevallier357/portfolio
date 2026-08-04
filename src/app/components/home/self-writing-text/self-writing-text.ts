import { Component, inject, Signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { switchMap } from 'rxjs';
import { Typewriter } from '../../../services/typewriter/typewriter';
import { ThemeService } from '../../../services/theme/theme';
import { ContentService } from '../../../services/content/content';
import { HomeTitle } from '../../../models/home-title';
import { LanguageService } from '../../../services/language/language';

@Component({
  selector: 'self-writing-text',
  templateUrl: './self-writing-text.html',
  styleUrl: './self-writing-text.scss',
})
export class SelfWritingText {
  protected readonly isDarkMode: Signal<boolean> = inject(ThemeService).isDarkMode;
  private readonly typewriter: Typewriter = inject(Typewriter);
  private readonly contentService: ContentService = inject(ContentService);
  protected readonly typedText: Signal<string> = toSignal(
    this.contentService
      .getTypewriterWords$()
      .pipe(switchMap((words) => this.typewriter.getTypewriterEffect(words))),
    { initialValue: '' },
  );
  protected readonly homeTitle: Signal<HomeTitle> = this.contentService.getHomeTitle();
  private readonly languageService: LanguageService = inject(LanguageService);
  protected readonly isFrench: Signal<boolean> = this.languageService.isFrench;
}
