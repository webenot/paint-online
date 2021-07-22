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
    if (canvasState.socketClient) {
      canvasState.setCanvas(canvasRef.current);
      toolState.setTool(new Brush(canvasRef.current, canvasState.socketClient, params.id));
      fetch(
        `${process.env.REACT_APP_SERVER_URL}/image?id=${params.id}`,
      )
        .then((response: Response) => response.json())
        .then((result: { img: string }) => {
          const image = new Image();
          image.src = result.img;
          image.onload = () => {
            const ctx = canvasRef.current.getContext('2d');
            ctx?.clearRect(
              0, 0, canvasRef.current.width, canvasRef.current.height,
            );
            ctx?.drawImage(
              image, 0, 0, canvasRef.current.width, canvasRef.current.height,
            );
          };
        });
    }
  }, [ canvasState.socketClient ]);

  useEffect(() => {
    if (canvasState.username) {
      canvasState.setSocketClient(
        new WebSocketClient(canvasState.username, process.env.REACT_APP_WS_URL || '', params.id),
      );
    }
  }, [ canvasState.username ]);

  const connectionHandler = useCallback(() => {
    canvasState.setUsername(usernameRef.current.value);
    setModal(false);
  }, []);

  const handleClose = () => setModal(false);

  const saveActionHandler = useCallback(() => {
    const dataUrl = canvasRef.current.toDataURL();
    canvasState.pushToUndo(dataUrl);
    fetch(
      `${process.env.REACT_APP_SERVER_URL}/image?id=${params.id}`,
      {
        body: JSON.stringify({ img: dataUrl }),
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        redirect: 'follow',
        cache: 'no-cache',
      },
    );
  }, []);

  return (
    <div className="canvas">
      <canvas
        ref={canvasRef}
        width={600}
        height={480}
        onMouseUp={saveActionHandler}
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
