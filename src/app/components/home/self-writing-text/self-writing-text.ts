import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { Typewriter } from '../../../services/typewriter/typewriter';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'self-writing-text',
  imports: [AsyncPipe],
  templateUrl: './self-writing-text.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './self-writing-text.scss',
})
export class SelfWritingText {
  private typewriter: Typewriter = inject(Typewriter);
  private words: string[] = ['front-end', 'back-end', 'full stack'];
  protected typedText$: Observable<string> = this.typewriter.getTypewriterEffect(this.words);
}
