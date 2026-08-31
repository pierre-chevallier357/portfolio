import {
  afterNextRender,
  DestroyRef,
  Directive,
  ElementRef,
  inject,
  output,
  OutputEmitterRef,
  PLATFORM_ID
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

/**
 * Emits `inView` once when the host element first becomes visible in the
 * viewport, so entrance animations can be delayed until the user actually
 * scrolls to the element instead of always playing on page load.
 */
@Directive({
  selector: '[portfolioInView]',
})
export class InView {
  public readonly inView: OutputEmitterRef<void> = output<void>();
  private readonly elementRef: ElementRef<HTMLElement> = inject(ElementRef);
  private readonly destroyRef: DestroyRef = inject(DestroyRef);
  private readonly platformId: object = inject(PLATFORM_ID);
  private observer: IntersectionObserver | null = null;

  constructor() {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }
    afterNextRender(() => this.observeVisibility());
  }

  private observeVisibility(): void {
    this.observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        this.inView.emit();
        this.observer?.disconnect();
      }
    });
    this.observer.observe(this.elementRef.nativeElement);
    this.destroyRef.onDestroy(() => this.observer?.disconnect());
  }
}
