import { Component } from '@angular/core';
import { AuraBackground } from './shared/background/aura-background';
import { Header } from './layout/header/header';
import { Home } from './sections/home/home';
import { About } from './sections/about/about';
import { Skills } from './sections/skills/skills';
import { Experience } from './sections/experience/experience';
import { Education } from './sections/education/education';
import { Contact } from './sections/contact/contact';
import { Footer } from './layout/footer/footer';

@Component({
  selector: 'portfolio-root',
  imports: [AuraBackground, Header, Home, About, Skills, Experience, Education, Contact, Footer],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {}
