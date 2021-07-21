import { Tool } from '@Tools/tool';

export class Rectangle extends Tool {

  mouseDown = false;
  startX = 0;
  startY = 0;
  saved: string | undefined;

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
    this.startX = e.pageX - (e.target as HTMLElement).offsetLeft;
    this.startY = e.pageY - (e.target as HTMLElement).offsetTop;
    this.saved = this.canvas?.toDataURL();
  }

  mouseMoveHandler (e: MouseEvent) {
    if (this.mouseDown) {
      const currentX = e.pageX - (e.target as HTMLElement).offsetLeft;
      const currentY = e.pageY - (e.target as HTMLElement).offsetTop;
      const width = currentX - this.startX;
      const height = currentY - this.startY;
      this.draw(
        this.startX,
        this.startY,
        width,
        height,
      );
    }
  }

  draw (x: number, y: number, w: number, h: number) {
    if (this.saved) {
      const image = new Image();
      image.src = this.saved;
      image.onload = () => {
        this.ctx.clearRect(0, 0, this.canvas?.width || 0, this.canvas?.height || 0);
        this.ctx.drawImage(image, 0, 0, this.canvas?.width || 0, this.canvas?.height || 0);
        this.ctx.beginPath();
        this.ctx.rect(x, y, w, h);
        this.ctx.fill();
        this.ctx.stroke();
      };
    }
  }

}
