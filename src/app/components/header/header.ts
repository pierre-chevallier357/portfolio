import { Component, computed, inject, PLATFORM_ID, Signal, signal } from '@angular/core';
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
  private readonly platformId: object = inject(PLATFORM_ID);
  private readonly isBrowser = isPlatformBrowser(this.platformId);
  private readonly remSize: Signal<number> = computed(() =>
    parseFloat(getComputedStyle(document.documentElement).fontSize),
  );
  private readonly scrollThresholdInPixels = this.isBrowser ? 5 * this.remSize() : 80; // 80 px is the fallback for SSR
  protected readonly hasScrolledAfterThreshold: Signal<boolean> = this.isBrowser
    ? toSignal(
        fromEvent(window, 'scroll').pipe(
          map(() => window.scrollY > this.scrollThresholdInPixels),
          startWith(window.scrollY > this.scrollThresholdInPixels),
        ),
        { initialValue: false },
      )
    : signal(false);
}
