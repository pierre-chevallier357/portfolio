import {
  AfterViewInit,
  Component,
  DestroyRef,
  ElementRef,
  inject,
  viewChild,
} from '@angular/core';
import { AuraDot } from '../models/aura-dot';

/** Colors used for the drifting aura dots, in soft pastel tones. */
const AURA_COLORS = ['#d094e5', '#a3dcd4', '#e8b89c', '#bdf3f9'] as const;
/** Background color the aura dots fade into, expressed as `r, g, b`. */
const AURA_BACKGROUND_RGB = '237, 231, 222';
const AURA_DOT_COUNT = 12;

/** Site-wide animated background, rendered once behind all pages/routes. */
@Component({
  selector: 'aura-background',
  templateUrl: './aura-background.html',
  styleUrl: './aura-background.scss',
})
export class AuraBackground implements AfterViewInit {
  private readonly canvasRef = viewChild<ElementRef<HTMLCanvasElement>>('auraCanvas');
  private readonly destroyRef = inject(DestroyRef);

  private dots: AuraDot[] = [];
  private animationFrameId?: number;

  public ngAfterViewInit(): void {
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
      this.dots = Array.from({ length: AURA_DOT_COUNT }, () => new AuraDot(canvas, AURA_COLORS));
    };

    const animate = (): void => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (const dot of this.dots) {
        dot.update();
        dot.draw(ctx, AURA_BACKGROUND_RGB);
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
