import { NgOptimizedImage } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'home',
  imports: [NgOptimizedImage],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {}
