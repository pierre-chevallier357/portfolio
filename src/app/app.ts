import { Component, ChangeDetectionStrategy } from '@angular/core';
import { HeaderMenu } from './components/header-menu/header-menu';
import { Home } from './components/home/home';

@Component({
  selector: 'app-root',
  imports: [HeaderMenu, Home],
  templateUrl: './app.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './app.scss',
})
export class App {}
