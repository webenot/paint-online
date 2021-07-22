import { makeAutoObservable } from 'mobx';
import { TTool } from '@App/tools';

class ToolState {

  tool: TTool | null = null;

  constructor () {
    makeAutoObservable<ToolState>(this);
  }

  setTool (tool: TTool) {
    this.tool = tool;
  }

  setFillColor (color: string) {
    if (this.tool) {
      this.tool.fillColor = color;
    }
  }

  setStrokeColor (color: string) {
    if (this.tool) {
      this.tool.strokeColor = color;
    }
  }

  setLineWidth (width: number) {
    if (this.tool) {
      this.tool.lineWidth = width;
    }
  }
}

export default new ToolState();
