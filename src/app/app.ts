import { Component } from '@angular/core';
import { AuraBackground } from './background/components/aura-background';
import { About } from './components/about/about';
import { Header } from './components/header/header';
import { Home } from './components/home/home';

@Component({
  selector: 'app-root',
  imports: [AuraBackground, Header, Home, About],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {}
