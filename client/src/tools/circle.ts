import { Tool } from '@Tools/tool';
import { TFigure, WebSocketClient } from '@App/ws';

export class Circle extends Tool {

  mouseDown = false;
  startX = 0;
  startY = 0;
  radius = 0;
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
        type: 'circle',
        x: this.startX,
        y: this.startY,
        radius: this.radius,
        fill: this.ctx.fillStyle,
        stroke: this.ctx.strokeStyle,
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
      const width = currentX - this.startX;
      const height = currentY - this.startY;
      this.radius = Math.pow(width * width + height * height, 0.5);
      this.draw(
        this.startX,
        this.startY,
        this.radius,
      );
    }
  }

  draw (x: number, y: number, radius: number) {
    if (this.saved) {
      const image = new Image();
      image.src = this.saved;
      image.onload = () => {
        this.ctx.clearRect(0, 0, this.canvas?.width || 0, this.canvas?.height || 0);
        this.ctx.drawImage(image, 0, 0, this.canvas?.width || 0, this.canvas?.height || 0);
        this.ctx.beginPath();
        this.ctx.arc(x, y, radius, 0, 2 * Math.PI);
        this.ctx.stroke();
      };
    }
  }

  static staticDraw (ctx: CanvasRenderingContext2D, figure: TFigure) {
    ctx.save();
    ctx.strokeStyle = figure.stroke || 'black';
    ctx.beginPath();
    ctx.arc(figure.x || 0, figure.y || 0, figure.radius || 0, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.restore();
  }

}
