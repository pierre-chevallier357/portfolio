import {AfterViewInit, Component, computed, DestroyRef, ElementRef, inject, Signal, viewChild,} from '@angular/core';
import {AuraDot} from '../models/aura-dot';
import {ThemeService} from '../../services/theme/theme';

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
  private readonly canvasRef: Signal<ElementRef<HTMLCanvasElement> | undefined> = viewChild<ElementRef<HTMLCanvasElement>>('auraCanvas');
  private readonly destroyRef: DestroyRef = inject(DestroyRef);
  private readonly themeService: ThemeService = inject(ThemeService);
  private readonly backgroundColor = computed(() =>
    this.themeService.isDarkMode() ? BACKGROUND_DARK_COLOR : BACKGROUND_LIGHT_COLOR,
  );
  private dots: AuraDot[] = [];
  private animationFrameId?: number;

  public ngAfterViewInit(): void { // TODO replace with signals
    if (typeof window === 'undefined') {
      return; // Skip canvas animation during server-side rendering.
    }

    const canvas = this.canvasRef()?.nativeElement;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) {
      return;
    }

    const resize = (): void => {
      canvas.width = canvas.clientWidth;
      canvas.height = canvas.clientHeight;
      this.dots = Array.from({length: DOTS_COUNT}, () => new AuraDot(canvas, DOTS_COLORS));
    };

    const animate = (): void => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (const dot of this.dots) {
        dot.update();
        dot.draw(ctx, this.backgroundColor());
      }
      this.animationFrameId = requestAnimationFrame(animate);
    };

    window.addEventListener('resize', resize);
    resize();
    animate();

    this.destroyRef.onDestroy(() => {
      window.removeEventListener('resize', resize);
      if (this.animationFrameId !== undefined) {
        cancelAnimationFrame(this.animationFrameId);
      }
    });
  }
}
