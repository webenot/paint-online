import canvasState from '@Store/canvasState';
import { Brush } from '@Tools/brush';
import { Rectangle } from '@Tools/rectangle';
import { Circle } from '@Tools/circle';
import { Line } from '@Tools/line';
import { Eraser } from '@Tools/eraser';

export type TFigure = {
  type: string;
  x?: number;
  y?: number;
  radius?: number;
  width?: number;
  height?: number;
  endX?: number;
  endY?: number;
}

export type TWSMessage = {
  method: string;
  id?: string;
  username?: string;
  figure: TFigure;
}

export class WebSocketClient {

  username = '';
  url = '';
  id = '';
  private socket: WebSocket;

  constructor (username: string, url: string, id: string) {
    this.username = username;
    this.url = url;
    this.id = id;
    this.connect();
  }

  connect () {
    if (this.username) {
      this.close();
      this.socket = new WebSocket(process.env.REACT_APP_WS_URL as string);
      this.socket.onopen = this.onSocketOpen.bind(this);
      this.socket.onmessage = this.onSocketMessage.bind(this);
      this.socket.onerror = this.onSocketError.bind(this);
      this.socket.onclose = this.onSocketClose.bind(this);
    }
  }

  close () {
    this.socket?.close();
  }

  onSocketOpen () {
    this.socket.send(JSON.stringify({
      id: this.id,
      username: canvasState.username,
      method: 'connection',
    }));
  }

  onSocketMessage (msg: MessageEvent) {
    try {
      const message: TWSMessage = JSON.parse(msg.data);
      switch (message.method) {
        case 'connection':
          console.log(`User ${message.username} is connected to server`);
          break;
        case 'draw':
          this.drawHandler(message);
      }
    } catch (e) {
      console.log(msg.data);
    }
  }

  onSocketError () {
    this.close();
    this.connect();
  }

  onSocketClose () {
    console.log('ws closed');
  }

  drawHandler (msg: TWSMessage) {
    const figure = msg.figure;
    const ctx = canvasState.canvas?.getContext('2d');
    if (ctx) {
      switch (figure.type) {
        case 'brush':
          Brush.draw(ctx, figure.x || 0, figure.y || 0);
          break;
        case 'erase':
          Eraser.draw(ctx, figure.x || 0, figure.y || 0);
          break;
        case 'rect':
          Rectangle.staticDraw(ctx, figure);
          this.send({
            method: 'draw',
            figure: { type: 'finish' },
          });
          break;
        case 'circle':
          Circle.staticDraw(ctx, figure);
          this.send({
            method: 'draw',
            figure: { type: 'finish' },
          });
          break;
        case 'line':
          Line.staticDraw(ctx, figure);
          this.send({
            method: 'draw',
            figure: { type: 'finish' },
          });
          break;
        case 'finish':
          ctx.beginPath();
          break;
      }
    }
  }

  send (msg: TWSMessage) {
    this.socket?.send(JSON.stringify(Object.assign({
      id: this.id,
      username: this.username,
    }, msg)));
  }
}
