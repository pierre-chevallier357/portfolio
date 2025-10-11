import { Component } from '@angular/core';
import { HeaderNavLinks } from './header-nav-links/header-nav-links';
import { NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'header-menu',
  imports: [HeaderNavLinks, NgOptimizedImage],
  templateUrl: './header-menu.html',
  styleUrl: './header-menu.scss',
})
export class HeaderMenu {}
