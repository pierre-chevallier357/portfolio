import {Directive, ElementRef, inject, OnDestroy, OnInit, output, OutputEmitterRef,} from '@angular/core';

/**
 * Emits `inView` once when the host element first becomes visible in the
 * viewport, so entrance animations can be delayed until the user actually
 * scrolls to the element instead of always playing on page load.
 */
@Directive({
  selector: '[inView]',
})
export class InView implements OnInit, OnDestroy {
  public readonly inView: OutputEmitterRef<void> = output<void>();

  private readonly elementRef: ElementRef<HTMLElement> = inject(ElementRef);
  private observer: IntersectionObserver | null = null;

  // TODO use signals instead
  public ngOnInit(): void {
    if (!this.isBrowser()) {
      return;
    }

    this.observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          this.inView.emit();
          this.observer?.disconnect();
        }
      },
      { threshold: 0.25 },
    );
    this.observer.observe(this.elementRef.nativeElement);
  }

  public ngOnDestroy(): void {
    this.observer?.disconnect();
  }

  private isBrowser(): boolean {
    return typeof IntersectionObserver !== 'undefined';
  }
}
