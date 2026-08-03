import { Component, inject, Signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
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
  private readonly words: string[] = ['front-end', 'back-end', 'full stack'];
  protected readonly typedText: Signal<string> = toSignal(
    this.typewriter.getTypewriterEffect(this.words),
    { initialValue: '' },
  );
}
