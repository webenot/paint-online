import { makeAutoObservable } from 'mobx';

class CanvasState {

  canvas: HTMLCanvasElement | null = null;

  undoList: string[] = [];
  redoList: string[] = [];

  username = '';

  constructor () {
    makeAutoObservable<CanvasState>(this);
  }

  setUsername (name: string) {
    this.username = name;
  }

  setCanvas (canvas: HTMLCanvasElement | null) {
    this.canvas = canvas;
  }

  pushToUndo (data: string) {
    this.undoList.push(data);
  }

  pushToRedo (data: string) {
    this.redoList.push(data);
  }

  undo () {
    if (this.canvas) {
      const ctx = this.canvas.getContext('2d');
      if (this.undoList.length) {
        const dataUrl = this.undoList.pop();
        const image = new Image();
        image.src = dataUrl || '';
        image.onload = () => {
          ctx?.clearRect(0, 0, this.canvas?.width || 0, this.canvas?.height || 0);
          ctx?.drawImage(image, 0, 0, this.canvas?.width || 0, this.canvas?.height || 0);
        };
        this.pushToRedo(this.canvas.toDataURL());
      } else {
        ctx?.clearRect(0, 0, this.canvas.width, this.canvas.height);
      }
    }
  }

  redo () {
    if (this.canvas) {
      const ctx = this.canvas.getContext('2d');
      if (this.redoList.length) {
        const dataUrl = this.redoList.pop();
        const image = new Image();
        image.src = dataUrl || '';
        image.onload = () => {
          ctx?.clearRect(0, 0, this.canvas?.width || 0, this.canvas?.height || 0);
          ctx?.drawImage(image, 0, 0, this.canvas?.width || 0, this.canvas?.height || 0);
        };
        this.pushToUndo(this.canvas.toDataURL());
      }
    }
  }
}

export default new CanvasState();
