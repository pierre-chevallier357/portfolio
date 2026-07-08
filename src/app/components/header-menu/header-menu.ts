import { Component } from '@angular/core';
import { HeaderNavLinks } from './header-nav-links/header-nav-links';
import { NgOptimizedImage } from '@angular/common';
import { ThemeToggle } from '../theme-toggle/theme-toggle';

@Component({
  selector: 'header-menu',
  imports: [HeaderNavLinks, NgOptimizedImage, ThemeToggle],
  templateUrl: './header-menu.html',
  styleUrl: './header-menu.scss',
})
export class HeaderMenu {}
