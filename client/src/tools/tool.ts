export class Tool {

  canvas: HTMLCanvasElement | null;
  ctx: CanvasRenderingContext2D;

  constructor (canvas: HTMLCanvasElement | null) {
    this.canvas = canvas;
    this.ctx = canvas?.getContext('2d') as CanvasRenderingContext2D;
    this.destroyEvents();
  }

  destroyEvents () {
    if (this.canvas) {
      this.canvas.onmouseup = null;
      this.canvas.onmousedown = null;
      this.canvas.onmousemove = null;
    }
  }
}
