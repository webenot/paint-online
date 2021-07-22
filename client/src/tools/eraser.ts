import { Tool } from '@Tools/tool';

export class Eraser extends Tool {

  mouseDown = false;
  constructor (canvas: HTMLCanvasElement | null) {
    super(canvas);
    this.listen();
  }

  listen () {
    if (this.canvas) {
      this.canvas.onmouseup = this.mouseUpHandler.bind(this);
      this.canvas.onmousedown = this.mouseDownHandler.bind(this);
      this.canvas.onmousemove = this.mouseMoveHandler.bind(this);
    }
  }

  mouseUpHandler () {
    this.mouseDown = false;
  }

  mouseDownHandler (e: MouseEvent) {
    this.mouseDown = true;
    this.ctx.beginPath();
    this.ctx.moveTo(
      e.pageX - (e.target as HTMLElement).offsetLeft,
      e.pageY - (e.target as HTMLElement).offsetTop,
    );
  }

  mouseMoveHandler (e: MouseEvent) {
    if (this.mouseDown) {
      this.draw(
        e.pageX - (e.target as HTMLElement).offsetLeft,
        e.pageY - (e.target as HTMLElement).offsetTop,
      );
    }
  }

  draw (x: number, y: number) {
    this.ctx.lineTo(x, y);
    this.ctx.strokeStyle = 'white';
    this.ctx.lineWidth = 5;
    this.ctx.stroke();
  }

}
