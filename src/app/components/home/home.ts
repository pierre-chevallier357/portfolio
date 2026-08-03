import { NgOptimizedImage } from '@angular/common';
import { Component, inject, Signal, signal, WritableSignal } from '@angular/core';
import { SelfWritingText } from './self-writing-text/self-writing-text';
import { InView } from '../../directives/in-view/in-view';
import { ThemeService } from '../../services/theme/theme';

@Component({
  selector: 'home',
  imports: [NgOptimizedImage, SelfWritingText, InView],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
  protected readonly isDarkMode: Signal<boolean> = inject(ThemeService).isDarkMode;
  protected readonly isInView: WritableSignal<boolean> = signal(false);
}
