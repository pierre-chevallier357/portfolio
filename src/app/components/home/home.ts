import {NgOptimizedImage} from '@angular/common';
import {Component, inject, Signal} from '@angular/core';
import {SelfWritingText} from './self-writing-text/self-writing-text';
import {ThemeService} from '../../services/theme/theme';

@Component({
  selector: 'home',
  imports: [NgOptimizedImage, SelfWritingText],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
  protected isDarkMode: Signal<boolean> = inject(ThemeService).isDarkMode;
}
