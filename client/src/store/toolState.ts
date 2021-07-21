import { makeAutoObservable } from 'mobx';

class ToolState {

  tool: any = null;

  constructor () {
    makeAutoObservable<ToolState>(this);
  }

  setTool (tool: any) {
    this.tool = tool;
  }
}

export default new ToolState();
