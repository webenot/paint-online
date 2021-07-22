import { Tool } from '@Tools/tool';
import { TFigure, WebSocketClient } from '@App/ws';

export class Line extends Tool {

  mouseDown = false;
  saved: string | undefined;
  startX = 0;
  startY = 0;
  currentX = 0;
  currentY = 0;

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
        type: 'line',
        x: this.startX,
        y: this.startY,
        endX: this.currentX,
        endY: this.currentY,
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
      this.currentX = e.pageX - (e.target as HTMLElement).offsetLeft;
      this.currentY = e.pageY - (e.target as HTMLElement).offsetTop;
      this.draw(
        this.currentX,
        this.currentY,
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

  static staticDraw (ctx: CanvasRenderingContext2D, figure: TFigure) {
    ctx.save();
    ctx.strokeStyle = figure.stroke || 'black';
    ctx.beginPath();
    ctx.moveTo(figure.x || 0, figure.y || 0);
    ctx.lineTo(figure.endX || 0, figure.endY || 0);
    ctx.stroke();
    ctx.restore();
  }

}
