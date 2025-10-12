import { NgOptimizedImage } from '@angular/common';
import { AfterViewInit, Component } from '@angular/core';
import { SelfWritingText } from './self-writing-text/self-writing-text';
import { HomeNavLinks } from './home-nav-links/home-nav-links';

var particlesJS: {
  load: (elementId: string, propertiesFilePath: string) => {};
};

@Component({
  selector: 'home',
  imports: [NgOptimizedImage, SelfWritingText, HomeNavLinks],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home implements AfterViewInit {
  public ngAfterViewInit(): void {
    particlesJS?.load('particles-js', 'particles/particles.json');
  }
}
