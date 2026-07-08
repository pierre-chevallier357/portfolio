/** A soft radial-gradient blob that drifts across the hero canvas. */
export class AuraDot {
  x = 0;
  y = 0;
  radius = 0;
  color = '';
  private vx = 0;
  private vy = 0;

  constructor(
    private readonly canvas: HTMLCanvasElement,
    private readonly colors: readonly string[],
  ) {
    this.reset();
  }

  /** Randomizes position, size, color and velocity within the canvas bounds. */
  reset(): void {
    this.x = Math.random() * this.canvas.width;
    this.y = Math.random() * this.canvas.height;
    this.radius = Math.random() * 300 + 200;
    this.color = this.colors[Math.floor(Math.random() * this.colors.length)];
    this.vx = (Math.random() - 0.5) * 12;
    this.vy = (Math.random() - 0.5) * 12;
  }

  /** Moves the dot and wraps it around the canvas edges once fully off-screen. */
  update(): void {
    this.x += this.vx;
    this.y += this.vy;

    if (this.x < -this.radius) this.x = this.canvas.width + this.radius;
    if (this.x > this.canvas.width + this.radius) this.x = -this.radius;
    if (this.y < -this.radius) this.y = this.canvas.height + this.radius;
    if (this.y > this.canvas.height + this.radius) this.y = -this.radius;
  }

  /** Paints the dot as a radial gradient fading into the given background color. */
  draw(ctx: CanvasRenderingContext2D, backgroundRgb: string): void {
    const gradient = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.radius);
    gradient.addColorStop(0, this.color);
    // Hold the full color further out before fading, so the pastel tones read
    // clearly instead of thinning out immediately from the center.
    gradient.addColorStop(0.5, this.color);
    gradient.addColorStop(1, `rgba(${backgroundRgb}, 0)`);

    ctx.save();
    // "multiply" keeps the pastel hues visible against the light background
    // instead of washing out, as plain alpha blending would on a light bg.
    ctx.globalCompositeOperation = 'multiply';
    ctx.beginPath();
    ctx.fillStyle = gradient;
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }
}
