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
    toolState.setTool(new toolClass(canvasState.canvas, canvasState.socketClient, canvasState.id));
  }, []);

  const selectColorHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    toolState.setFillColor(e.target.value);
  }, []);

  const undoHandler = useCallback(() => {
    canvasState.undo();
  }, []);

  const redoHandler = useCallback(() => {
    canvasState.redo();
  }, []);

  const download = useCallback(() => {
    const dataUrl = canvasState.canvas?.toDataURL();
    console.log(dataUrl);
    if (dataUrl) {
      const a = document.createElement('a');
      a.href = dataUrl;
      a.download = canvasState.id + '.jpg';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }
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
      <button
        className="toolbar__btn undo"
        onClick={undoHandler}
      />
      <button
        className="toolbar__btn redo"
        onClick={redoHandler}
      />
      <button
        className="toolbar__btn save"
        onClick={download}
      />
    </div>
  );
};
