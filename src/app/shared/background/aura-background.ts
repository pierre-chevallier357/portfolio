import {
  afterNextRender,
  Component,
  computed,
  DestroyRef,
  ElementRef,
  inject,
  NgZone,
  PLATFORM_ID,
  Signal,
  viewChild,
} from '@angular/core';
import {isPlatformBrowser} from '@angular/common';
import {AuraDot} from './aura-dot';
import {ThemeStore} from '../../core/theme/theme-store';

const DOTS_COLORS: string[] = ['#ff5e00', '#f2ff00', '#00e5ff', '#15ff00', '#ff00f7'];
const BACKGROUND_LIGHT_COLOR: string = '#ede7de';
const BACKGROUND_DARK_COLOR: string = '#025a4e';
const DOTS_COUNT: number = 12;

@Component({
  selector: 'portfolio-aura-background',
  templateUrl: './aura-background.html',
  styleUrl: './aura-background.scss',
})
export class AuraBackground {
  private readonly canvasRef: Signal<ElementRef<HTMLCanvasElement>> =
    viewChild.required<ElementRef<HTMLCanvasElement>>('auraCanvas');
  private readonly destroyRef: DestroyRef = inject(DestroyRef);
  private readonly themeStore: ThemeStore = inject(ThemeStore);
  private readonly ngZone: NgZone = inject(NgZone);
  private readonly platformId: object = inject(PLATFORM_ID);
  private readonly backgroundColor: Signal<string> = computed(() =>
    this.themeStore.isDarkMode() ? BACKGROUND_DARK_COLOR : BACKGROUND_LIGHT_COLOR,
  );
  private dots: AuraDot[] = [];
  private animationFrameId?: number;

  constructor() {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }
    afterNextRender(() => this.initializeCanvas());
  }

  private initializeCanvas(): void {
    const canvas: HTMLCanvasElement = this.canvasRef().nativeElement;
    const ctx: CanvasRenderingContext2D | null = canvas.getContext('2d');
    if (!ctx) {
      return;
    }

    const resize = (): void => {
      const previousWidth = canvas.width;
      const previousHeight = canvas.height;
      canvas.width = canvas.clientWidth;
      canvas.height = canvas.clientHeight;

      if (this.dots.length === 0) {
        this.dots = Array.from({ length: DOTS_COUNT }, () => new AuraDot(canvas, DOTS_COLORS));
        return;
      }

      // Rescale existing dots instead of recreating them so the aura
      // stretches smoothly on resize instead of resetting to new random
      // positions/colors, which causes screen flashing.
      if (previousWidth > 0 && previousHeight > 0) {
        const scaleX = canvas.width / previousWidth;
        const scaleY = canvas.height / previousHeight;
        for (const dot of this.dots) {
          dot.rescale(scaleX, scaleY);
        }
      }
    };

    let resizeTimeoutId: ReturnType<typeof setTimeout> | undefined;
    const debouncedResize = (): void => {
      clearTimeout(resizeTimeoutId);
      resizeTimeoutId = setTimeout(resize, 150);
    };

    const animate = (): void => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (const dot of this.dots) {
        dot.update();
        dot.draw(ctx, this.backgroundColor());
      }
      this.animationFrameId = requestAnimationFrame(animate);
    };

    // Run the resize listener and animation loop outside Angular's zone so
    // per-frame updates don't trigger unnecessary change detection cycles.
    this.ngZone.runOutsideAngular(() => {
      window.addEventListener('resize', debouncedResize);
      resize();
      animate();
    });

    this.destroyRef.onDestroy(() => {
      window.removeEventListener('resize', debouncedResize);
      clearTimeout(resizeTimeoutId);
      if (this.animationFrameId !== undefined) {
        cancelAnimationFrame(this.animationFrameId);
      }
    });
  }
}
