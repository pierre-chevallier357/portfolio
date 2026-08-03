import { Component, inject, Signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { HttpClient } from '@angular/common/http';
import { switchMap } from 'rxjs';
import { Typewriter } from '../../../services/typewriter/typewriter';
import { ThemeService } from '../../../services/theme/theme';

@Component({
  selector: 'self-writing-text',
  templateUrl: './self-writing-text.html',
  styleUrl: './self-writing-text.scss',
})
export class SelfWritingText {
  protected readonly isDarkMode: Signal<boolean> = inject(ThemeService).isDarkMode;
  private readonly typewriter: Typewriter = inject(Typewriter);
  private readonly http: HttpClient = inject(HttpClient);
  protected readonly typedText: Signal<string> = toSignal(
    this.http
      .get<string[]>('data/typewriter-words.json')
      .pipe(switchMap((words) => this.typewriter.getTypewriterEffect(words))),
    { initialValue: '' },
  );
}
