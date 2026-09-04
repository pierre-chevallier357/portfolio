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
  public readonly dotPositions: InputSignal<number[]> = input.required<number[]>();
  public readonly height: InputSignal<number> = input.required<number>();
  public readonly top: InputSignal<number> = input.required<number>();
  protected readonly dotsPercentages: Signal<number[]> = computed(() =>
    this.dotPositions().map((position) => Math.min(100, Math.max(0, position))),
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
  private readonly rawProgress: Signal<number> = computed(() => {
    this.updateScrollValue();
    if (!this.isBrowser) return -1;
    const rect: DOMRect = this.line().nativeElement.getBoundingClientRect();
    const viewportCenter: number = (window.innerHeight ?? 0) / 2;
    return (viewportCenter - rect.top) / rect.height;
  });
  protected readonly progress: Signal<number> = computed(() =>
    Math.max(0, Math.min(this.rawProgress(), 1)),
  );
  protected readonly fillHeight: Signal<string> = computed(() => `${this.progress() * 100}%`);
  protected readonly isDotActive = (dot: number): boolean => this.rawProgress() >= dot / 100;
}
