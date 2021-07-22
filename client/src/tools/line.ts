import { Tool } from '@Tools/tool';

export class Line extends Tool {

  mouseDown = false;
  saved: string | undefined;
  startX = 0;
  startY = 0;

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
    this.startX = e.pageX - (e.target as HTMLElement).offsetLeft;
    this.startY = e.pageY - (e.target as HTMLElement).offsetTop;
    this.ctx.moveTo(
      this.startX,
      this.startY,
    );
    this.saved = this.canvas?.toDataURL();
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
    if (this.saved) {
      const image = new Image();
      image.src = this.saved;
      image.onload = () => {
        this.ctx.clearRect(0, 0, this.canvas?.width || 0, this.canvas?.height || 0);
        this.ctx.drawImage(image, 0, 0, this.canvas?.width || 0, this.canvas?.height || 0);
        this.ctx.beginPath();
        this.ctx.moveTo(this.startX, this.startY);
        this.ctx.lineTo(x, y);
        this.ctx.stroke();
      };
    }
  }

}
