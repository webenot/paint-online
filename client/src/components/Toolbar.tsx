import React, { ChangeEvent, FC, ReactElement, useCallback } from 'react';

import '@Styles/toolbar.sass';

import { Brush } from '@Tools/brush';
import canvasState from '@Store/canvasState';
import toolState from '@Store/toolState';
import { Rectangle } from '@Tools/rectangle';
import { Circle } from '@Tools/circle';
import { Eraser } from '@Tools/eraser';
import { Line } from '@Tools/line';
import { TToolClass } from '@App/tools';

type TProps = {
  children?: never;
}

export const Toolbar: FC<TProps> = (): ReactElement => {

  const selectToolHandler = useCallback((toolClass: TToolClass) => () => {
    toolState.setTool(new toolClass(canvasState.canvas));
  }, []);

  const selectColorHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    toolState.setStrokeColor(e.target.value);
  }, []);

  return (
    <div className="toolbar">
      <button className="toolbar__btn brush" onClick={selectToolHandler(Brush)} />
      <button className="toolbar__btn rect" onClick={selectToolHandler(Rectangle)} />
      <button className="toolbar__btn circle" onClick={selectToolHandler(Circle)} />
      <button className="toolbar__btn eraser" onClick={selectToolHandler(Eraser)} />
      <button className="toolbar__btn line" onClick={selectToolHandler(Line)} />
      <input
        type="color"
        onChange={selectColorHandler}
      />
      <button className="toolbar__btn undo" />
      <button className="toolbar__btn redo" />
      <button className="toolbar__btn save" />
    </div>
  );
};
