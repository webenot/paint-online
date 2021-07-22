import canvasState from '@Store/canvasState';

export class WebSocketClient {

  username = '';
  url = '';
  id = '';
  private socket: WebSocket;

  constructor (username: string, url: string, id: string) {
    this.username = username;
    this.url = url;
    this.id = id;
    this.connect();
  }

  connect () {
    if (this.username) {
      this.close();
      this.socket = new WebSocket(process.env.REACT_APP_WS_URL as string);
      this.socket.onopen = this.onSocketOpen.bind(this);
      this.socket.onmessage = this.onSocketMessage.bind(this);
      this.socket.onerror = this.onSocketError.bind(this);
      this.socket.onclose = this.onSocketClose.bind(this);
    }
  }

  close () {
    this.socket?.close();
  }

  onSocketOpen () {
    this.socket.send(JSON.stringify({
      id: this.id,
      username: canvasState.username,
      method: 'connection',
    }));
  }

  onSocketMessage (msg: MessageEvent) {
    try {
      const message = JSON.parse(msg.data);
      console.log(message);
    } catch (e) {
      console.log(msg.data);
    }
  }

  onSocketError () {
    this.close();
    this.connect();
  }

  onSocketClose () {
    console.log('ws closed');
  }
}
