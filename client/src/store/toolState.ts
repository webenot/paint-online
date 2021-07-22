import { makeAutoObservable } from 'mobx';
import { TTool } from '@App/tools';

class ToolState {

  tool: any = null;

  constructor () {
    makeAutoObservable<ToolState>(this);
  }

  setTool (tool: TTool) {
    this.tool = tool;
  }

  setFillColor (color: string) {
    this.tool.fillColor = color;
  }

  setStrokeColor (color: string) {
    this.tool.strokeColor = color;
  }

  setLineWidth (width: number) {
    this.tool.lineWidth = width;
  }
}

export default new ToolState();
