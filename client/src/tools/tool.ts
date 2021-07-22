export class Tool {

  canvas: HTMLCanvasElement | null;
  ctx: CanvasRenderingContext2D;

  constructor (canvas: HTMLCanvasElement | null) {
    this.canvas = canvas;
    this.ctx = canvas?.getContext('2d') as CanvasRenderingContext2D;
    this.destroyEvents();
  }

  set fillColor (color: string) {
    this.ctx.fillStyle = color;
  }

  set strokeColor (color: string) {
    this.ctx.strokeStyle = color;
  }

  set lineWidth (width: number) {
    this.ctx.lineWidth = width;
  }

  destroyEvents () {
    if (this.canvas) {
      this.canvas.onmouseup = null;
      this.canvas.onmousedown = null;
      this.canvas.onmousemove = null;
    }
  }
}
