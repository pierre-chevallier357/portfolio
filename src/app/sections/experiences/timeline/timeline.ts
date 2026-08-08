import { isPlatformBrowser } from '@angular/common';
import {
  Component,
  computed,
  ElementRef,
  inject,
  input,
  InputSignal,
  PLATFORM_ID,
  Signal,
  viewChild
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { fromEvent, of } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

@Component({
  selector: 'portfolio-timeline',
  standalone: true,
  templateUrl: './timeline.html',
  styleUrl: './timeline.scss',
})
export class Timeline {
  public readonly dotsCount: InputSignal<number> = input.required<number>();
  public readonly height: InputSignal<number> = input.required<number>();
  public readonly top: InputSignal<number> = input.required<number>();
  protected readonly dotsPercentages: Signal<number[]> = computed(() =>
    this.getEvenlySpacedPercentages(this.dotsCount()),
  );
  private readonly line: Signal<ElementRef<HTMLDivElement>> =
    viewChild.required<ElementRef<HTMLDivElement>>('line');
  private readonly platformId: object = inject(PLATFORM_ID);
  private readonly isBrowser: boolean = isPlatformBrowser(this.platformId);
  private readonly updateScrollValue: Signal<number> = toSignal(
    this.isBrowser
      ? fromEvent(window, 'scroll').pipe(
          startWith(null),
          map(() => window.scrollY),
        )
      : of(0),
    { initialValue: 0 },
  );
  protected readonly progress: Signal<number> = computed(() => {
    this.updateScrollValue();
    if (!this.isBrowser) return 0;
    const rect: DOMRect = this.line().nativeElement.getBoundingClientRect();
    const viewportCenter: number = (window.innerHeight ?? 0) / 2;
    return Math.max(0, Math.min((viewportCenter - rect.top) / rect.height, 1));
  });
  protected readonly fillHeight: Signal<string> = computed(() => `${this.progress() * 100}%`);

  private getEvenlySpacedPercentages(count: number): number[] {
    if (count <= 0) return [];
    if (count === 1) return [0];
    return Array.from({ length: count }, (_, i) => Math.round((i * 100) / (count - 1)));
  }
}
