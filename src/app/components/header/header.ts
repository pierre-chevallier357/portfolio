import { Component } from '@angular/core';
import { HeaderNavLinks } from './header-nav-links/header-nav-links';
import { NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'header-menu',
  imports: [HeaderNavLinks, NgOptimizedImage],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {}
