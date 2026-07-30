import { Component, inject, PLATFORM_ID, Signal, signal } from '@angular/core';
import { HeaderNavLinks } from './header-nav-links/header-nav-links';
import { isPlatformBrowser, NgOptimizedImage } from '@angular/common';
import { toSignal } from '@angular/core/rxjs-interop';
import { fromEvent, map } from 'rxjs';
import { startWith } from 'rxjs/operators';

@Component({
  selector: 'header-menu',
  imports: [HeaderNavLinks, NgOptimizedImage],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  private readonly platformId: Object = inject(PLATFORM_ID);
  private readonly isBrowser = isPlatformBrowser(this.platformId);
  private readonly scrollThreshold = this.isBrowser
    ? 10 * parseFloat(getComputedStyle(document.documentElement).fontSize)
    : 160; // fallback for SSR
  protected readonly isScrolledAboveThreshold: Signal<boolean> = this.isBrowser
    ? toSignal(
        fromEvent(window, 'scroll').pipe(
          map(() => window.scrollY > this.scrollThreshold),
          startWith(window.scrollY > this.scrollThreshold),
        ),
        { initialValue: false },
      )
    : signal(false);
}
