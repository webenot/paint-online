import React, { FC, ReactElement } from 'react';

import '@Styles/toolbar.sass';

import { Brush } from '@Tools/brush';
import canvasState from '@Store/canvasState';
import toolState from '@Store/toolState';
import { Rectangle } from '@Tools/rectangle';
import { Circle } from '@Tools/circle';

type TProps = {
  children?: never;
}

export const Toolbar: FC<TProps> = (): ReactElement => (
  <div className="toolbar">
    <button className="toolbar__btn brush" onClick={() => toolState.setTool(new Brush(canvasState.canvas))} />
    <button className="toolbar__btn rect" onClick={() => toolState.setTool(new Rectangle(canvasState.canvas))} />
    <button className="toolbar__btn circle" onClick={() => toolState.setTool(new Circle(canvasState.canvas))} />
    <button className="toolbar__btn eraser" />
    <button className="toolbar__btn line" />
    <input type="color"/>
    <button className="toolbar__btn undo" />
    <button className="toolbar__btn redo" />
    <button className="toolbar__btn save" />
  </div>
);
