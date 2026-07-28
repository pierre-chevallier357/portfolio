import { Component } from '@angular/core';
import { AuraBackground } from './background/components/aura-background';
import { About } from './components/about/about';
import { Header } from './components/header/header';
import { Home } from './components/home/home';
import { Skills } from './components/skills/skills';
import { Experiences } from './components/experiences/experiences';

@Component({
  selector: 'app-root',
  imports: [AuraBackground, Header, Home, About, Skills, Experiences],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {}
