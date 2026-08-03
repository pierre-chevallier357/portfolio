import {
  AfterViewInit,
  Component,
  computed,
  DestroyRef,
  ElementRef,
  inject,
  Signal,
  viewChild,
} from '@angular/core';
import { AuraDot } from '../models/aura-dot';
import { ThemeService } from '../../services/theme/theme';

const DOTS_COLORS = ['#FF5E00', '#F2FF00', '#00E5FF', '#15FF00', '#FF00F7'] as const;
const BACKGROUND_LIGHT_COLOR = '237, 231, 222';
const BACKGROUND_DARK_COLOR = '35, 56, 49';
const DOTS_COUNT = 12;

@Component({
  selector: 'aura-background',
  templateUrl: './aura-background.html',
  styleUrl: './aura-background.scss',
})
export class AuraBackground implements AfterViewInit {
  private readonly canvasRef: Signal<ElementRef<HTMLCanvasElement> | undefined> =
    viewChild<ElementRef<HTMLCanvasElement>>('auraCanvas');
  private readonly destroyRef: DestroyRef = inject(DestroyRef);
  private readonly themeService: ThemeService = inject(ThemeService);
  private readonly backgroundColor: Signal<string> = computed(() =>
    this.themeService.isDarkMode() ? BACKGROUND_DARK_COLOR : BACKGROUND_LIGHT_COLOR,
  );
  private dots: AuraDot[] = [];
  private animationFrameId?: number;

  public ngAfterViewInit(): void {
    // TODO replace with signals ?
    if (typeof window === 'undefined') {
      return; // Skip canvas animation during server-side rendering.
    }

    const canvas: HTMLCanvasElement | undefined = this.canvasRef()?.nativeElement;
    const ctx: CanvasRenderingContext2D | undefined | null = canvas?.getContext('2d');
    if (!canvas || !ctx) {
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

    // Debounce so a drag-resize doesn't repeatedly clear/rescale the canvas
    // on every intermediate resize event.
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

    window.addEventListener('resize', debouncedResize);
    resize();
    animate();

    this.destroyRef.onDestroy(() => {
      window.removeEventListener('resize', debouncedResize);
      clearTimeout(resizeTimeoutId);
      if (this.animationFrameId !== undefined) {
        cancelAnimationFrame(this.animationFrameId);
      }
    });
  }
}
