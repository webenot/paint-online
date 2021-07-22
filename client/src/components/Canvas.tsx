import React, { FC, MutableRefObject, ReactElement, useCallback, useEffect, useRef } from 'react';
import { observer } from 'mobx-react-lite';

import '@Styles/canvas.sass';
import canvasState from '@Store/canvasState';
import toolState from '@Store/toolState';
import { Brush } from '@Tools/brush';

export const Canvas: FC = observer((): ReactElement => {

  const canvasRef = useRef<HTMLCanvasElement>() as MutableRefObject<HTMLCanvasElement>;

  useEffect(() => {
    canvasState.setCanvas(canvasRef.current);
    toolState.setTool(new Brush(canvasRef.current));
  }, []);

  const saveActionHandler = useCallback(() => {
    canvasState.pushToUndo(canvasRef.current.toDataURL());
  }, []);

  return (
    <div className="canvas">
      <canvas
        ref={canvasRef}
        width={600}
        height={480}
        onMouseDown={saveActionHandler}
      />
    </div>
  );
});
