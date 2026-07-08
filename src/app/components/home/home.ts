import { NgOptimizedImage } from '@angular/common';
import { Component } from '@angular/core';
import { SelfWritingText } from './self-writing-text/self-writing-text';
import { HomeNavLinks } from './home-nav-links/home-nav-links';

@Component({
  selector: 'home',
  imports: [NgOptimizedImage, SelfWritingText, HomeNavLinks],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {}
