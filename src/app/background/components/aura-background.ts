import {AfterViewInit, Component, computed, DestroyRef, ElementRef, inject, Signal, viewChild,} from '@angular/core';
import {AuraDot} from '../models/aura-dot';
import {ThemeService} from '../../services/theme/theme';

/** Colors used for the drifting aura dots, in soft pastel tones. */
const AURA_COLORS = ['#d094e5', '#a3dcd4', '#e8b89c', '#bdf3f9'] as const; // TODO choose better colors
/** Background color the aura dots fade into, expressed as `r, g, b`, per color scheme. */
const AURA_BACKGROUND_RGB_LIGHT = '237, 231, 222'; // TODO replace with my colors
const AURA_BACKGROUND_RGB_DARK = '35, 56, 49'; // TODO replace with my colors
const AURA_DOT_COUNT = 12;

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
    this.themeService.isDarkMode() ? AURA_BACKGROUND_RGB_DARK : AURA_BACKGROUND_RGB_LIGHT,
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
      this.dots = Array.from({length: AURA_DOT_COUNT}, () => new AuraDot(canvas, AURA_COLORS));
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
