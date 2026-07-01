import { Component } from '@angular/core';
import { HeaderMenu } from './components/header-menu/header-menu';
import { Home } from './components/home/home';

@Component({
  selector: 'app-root',
  imports: [HeaderMenu, Home],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {}
