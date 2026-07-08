import { Component } from '@angular/core';
import { AuraBackground } from './background/components/aura-background';
import { HeaderMenu } from './components/header-menu/header-menu';
import { Home } from './components/home/home';

@Component({
  selector: 'app-root',
  imports: [AuraBackground, HeaderMenu, Home],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {}
