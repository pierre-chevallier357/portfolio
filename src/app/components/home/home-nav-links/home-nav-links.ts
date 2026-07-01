import { NgOptimizedImage } from '@angular/common';
import { Component, signal, WritableSignal } from '@angular/core';

@Component({
  selector: 'home-nav-links',
  imports: [NgOptimizedImage],
  templateUrl: './home-nav-links.html',
  styleUrl: './home-nav-links.scss',
})
export class HomeNavLinks {
  protected isAboutHovered: WritableSignal<boolean> = signal(false);
  protected isLinkedInHovered: WritableSignal<boolean> = signal(false);
  protected isGitHubHovered: WritableSignal<boolean> = signal(false);
}
