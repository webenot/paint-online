import { Brush } from '@Tools/brush';
import { Circle } from '@Tools/circle';
import { Eraser } from '@Tools/eraser';
import { Rectangle } from '@Tools/rectangle';
import { WebSocketClient } from '@App/ws';

export type TTool = Brush | Circle | Eraser | Rectangle;
export type TToolClass = {
  new (canvas: HTMLCanvasElement | null, socketClient: WebSocketClient | null, id: string): TTool;
};
