import { Tool } from '@Tools/tool';
import { TFigure, WebSocketClient } from '@App/ws';

export class Brush extends Tool {

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
          type: 'brush',
          x: e.pageX - (e.target as HTMLElement).offsetLeft,
          y: e.pageY - (e.target as HTMLElement).offsetTop,
          stroke: this.ctx.strokeStyle,
        },
      });
    }
  }

  static draw (ctx: CanvasRenderingContext2D, figure: TFigure) {
    ctx.save();
    ctx.strokeStyle = figure.stroke || 'black';
    ctx.lineTo(figure.x || 0, figure.y || 0);
    ctx.stroke();
    ctx.restore();
  }

}
