import { Brush } from '@Tools/brush';
import { Circle } from '@Tools/circle';
import { Eraser } from '@Tools/eraser';
import { Rectangle } from '@Tools/rectangle';

export type TTool = Brush | Circle | Eraser | Rectangle;
export type TToolClass = { new (canvas: HTMLCanvasElement | null): TTool };
