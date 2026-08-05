import { Component } from '@angular/core';
import { AuraBackground } from './shared/background/aura-background';
import { Header } from './layout/header/header';
import { Home } from './sections/home/home';
import { About } from './sections/about/about';
import { Skills } from './sections/skills/skills';
import { Experiences } from './sections/experiences/experiences';

@Component({
  selector: 'portfolio-root',
  imports: [AuraBackground, Header, Home, About, Skills, Experiences],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {}
