import { Tool } from '@Tools/tool';
import { WebSocketClient } from '@App/ws';

export class Eraser extends Tool {

  mouseDown = false;

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
      figure: { type: 'finish' },
    });
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
      this.socketClient?.send({
        method: 'draw',
        figure: {
          type: 'erase',
          x: e.pageX - (e.target as HTMLElement).offsetLeft,
          y: e.pageY - (e.target as HTMLElement).offsetTop,
        },
      });
    }
  }

  static draw (ctx: CanvasRenderingContext2D, x: number, y: number) {
    ctx.save();
    ctx.lineTo(x, y);
    ctx.strokeStyle = 'white';
    ctx.stroke();
    ctx.restore();
  }

}
