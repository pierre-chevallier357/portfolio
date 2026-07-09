import {Component, inject, Signal} from '@angular/core';
import {Typewriter} from '../../../services/typewriter/typewriter';
import {Observable} from 'rxjs';
import {AsyncPipe} from '@angular/common';
import {ThemeService} from '../../../services/theme/theme';

@Component({
  selector: 'self-writing-text',
  imports: [AsyncPipe],
  templateUrl: './self-writing-text.html',
  styleUrl: './self-writing-text.scss',
})
export class SelfWritingText {
  protected isDarkMode: Signal<boolean> = inject(ThemeService).isDarkMode;
  private typewriter: Typewriter = inject(Typewriter);
  private words: string[] = ['front-end', 'back-end', 'full stack'];
  protected typedText$: Observable<string> = this.typewriter.getTypewriterEffect(this.words);
}
