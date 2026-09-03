/** A soft radial-gradient blob that drifts across the canvas. */
export class AuraDot {
  x: number = 0;
  y: number = 0;
  radius: number = 0;
  color: string = '';
  private vx: number = 0;
  private vy: number = 0;

  constructor(
    private readonly canvas: HTMLCanvasElement,
    private readonly colors: readonly string[],
  ) {
    this.reset();
  }

  /** Randomizes position, size, color and velocity within the canvas bounds. */
  public reset(): void {
    this.x = Math.random() * this.canvas.width;
    this.y = Math.random() * this.canvas.height;
    this.radius = Math.random() * 300 + 200; // Random radius between 200 and 500
    this.color = this.colors[Math.floor(Math.random() * this.colors.length)];
    this.vx = (Math.random() - 0.5) * 12; // Random velocity between -6 px and 6 px for x direction
    this.vy = (Math.random() - 0.5) * 12; // Random velocity between -6 px and 6 px for y direction
  }

  /**
   * Rescales position and size to match a new canvas size, keeping the dot's
   * relative place instead of jumping to a brand new random spot. Used when
   * the canvas is resized so the aura stretches smoothly rather than resetting.
   */
  public rescale(scaleX: number, scaleY: number): void {
    this.x *= scaleX;
    this.y *= scaleY;
    this.radius *= (scaleX + scaleY) / 2;
  }

  /** Moves the dot and wraps it around the canvas edges once fully off-screen. */
  public update(): void {
    this.x += this.vx;
    this.y += this.vy;

    if (this.x < -this.radius) this.x = this.canvas.width + this.radius;
    if (this.x > this.canvas.width + this.radius) this.x = -this.radius;
    if (this.y < -this.radius) this.y = this.canvas.height + this.radius;
    if (this.y > this.canvas.height + this.radius) this.y = -this.radius;
  }

  /** Paints the dot as a radial gradient fading into the given background color. */
  public draw(ctx: CanvasRenderingContext2D, backgroundColor: string): void {
    const gradient: CanvasGradient = ctx.createRadialGradient(
      this.x,
      this.y,
      0,
      this.x,
      this.y,
      this.radius,
    );
    gradient.addColorStop(0, this.color);
    // Hold the full color further out before fading, so the pastel tones read
    // clearly instead of thinning out immediately from the center.
    gradient.addColorStop(0.5, this.color);
    gradient.addColorStop(1, backgroundColor);

    ctx.save();
    ctx.beginPath();
    ctx.fillStyle = gradient;
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }
}
