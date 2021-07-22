import React, { FC, MutableRefObject, ReactElement, useCallback, useEffect, useRef, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { Button, Modal } from 'react-bootstrap';
import { useParams } from 'react-router-dom';

import '@Styles/canvas.sass';
import 'bootstrap/scss/bootstrap.scss';

import canvasState from '@Store/canvasState';
import toolState from '@Store/toolState';
import { Brush } from '@Tools/brush';
import { WebSocketClient } from '@App/ws';

export const Canvas: FC = observer((): ReactElement => {

  const canvasRef = useRef<HTMLCanvasElement>() as MutableRefObject<HTMLCanvasElement>;
  const usernameRef = useRef<HTMLInputElement>() as MutableRefObject<HTMLInputElement>;
  const [ modal, setModal ] = useState(true);

  const params: any = useParams();

  useEffect(() => {
    canvasState.setCanvas(canvasRef.current);
    toolState.setTool(new Brush(canvasRef.current));
  }, []);

  useEffect(() => {
    new WebSocketClient(canvasState.username, process.env.REACT_APP_WS_URL as string, params.id);
  }, [ canvasState.username ]);

  const connectionHandler = useCallback(() => {
    canvasState.setUsername(usernameRef.current.value);
    setModal(false);
  }, []);

  const handleClose = () => setModal(false);

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
      <Modal show={modal} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title>Enter Your name</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <input
            type="text"
            ref={usernameRef}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={connectionHandler}
          >
            Enter
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
});
