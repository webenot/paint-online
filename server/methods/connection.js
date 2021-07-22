const { broadcastConnection } = require('ws/broadcastConnection');

const connectionHandler = (ws, msg, aWss) => {
  ws.id = msg.id;
  broadcastConnection(ws, msg, aWss);
};

module.exports = { connectionHandler };
