import { Component } from '@angular/core';
import { AuraBackground } from './shared/background/aura-background';
import { Header } from './layout/header/header';
import { HomeSection } from './sections/home/home-section';
import { AboutSection } from './sections/about/about-section';
import { SkillsSection } from './sections/skills/skills-section';
import { ExperienceSection } from './sections/experience/experience-section';
import { EducationSection } from './sections/education/education-section';
import { ContactSection } from './sections/contact/contact-section';
import { Footer } from './layout/footer/footer';

@Component({
  selector: 'portfolio-root',
  imports: [
    AuraBackground,
    Header,
    HomeSection,
    AboutSection,
    SkillsSection,
    ExperienceSection,
    EducationSection,
    ContactSection,
    Footer,
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {}
