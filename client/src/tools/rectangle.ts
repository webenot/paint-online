import { Tool } from '@Tools/tool';
import { TFigure, WebSocketClient } from '@App/ws';

export class Rectangle extends Tool {

  mouseDown = false;
  startX = 0;
  startY = 0;
  width = 0;
  height = 0;
  saved: string | undefined;

  constructor (canvas: HTMLCanvasElement | null, socketClient: WebSocketClient | null, id: string) {
    super(canvas, socketClient, id);
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

    this.socketClient?.send({
      method: 'draw',
      figure: {
        type: 'rect',
        x: this.startX,
        y: this.startY,
        width: this.width,
        height: this.height,
      },
    });
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
      const currentX = e.pageX - (e.target as HTMLElement).offsetLeft;
      const currentY = e.pageY - (e.target as HTMLElement).offsetTop;
      this.width = currentX - this.startX;
      this.height = currentY - this.startY;
      this.draw(
        this.startX,
        this.startY,
        this.width,
        this.height,
      );
    }
  }

  draw (x: number, y: number, w: number, h: number) {
    const image = new Image();
    image.src = this.saved || '';
    image.onload = () => {
      this.ctx.clearRect(0, 0, this.canvas?.width || 0, this.canvas?.height || 0);
      this.ctx.drawImage(image, 0, 0, this.canvas?.width || 0, this.canvas?.height || 0);
      this.ctx.beginPath();
      this.ctx.rect(x, y, w, h);
      this.ctx.fill();
      this.ctx.stroke();
    };
  }

  static staticDraw (ctx: CanvasRenderingContext2D, figure: TFigure) {
    ctx.beginPath();
    ctx.rect(figure.x || 0, figure.y || 0, figure.width || 0, figure.height || 0);
    ctx.fill();
    ctx.stroke();
  }

}
