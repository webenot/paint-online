const express = require('express');
const { connectionHandler } = require('methods/connection');

const app = express();
const wsServer = require('express-ws')(app);
const aWss = wsServer.getWss();

const PORT = process.env.PORT || 5000;

app.ws('/', (ws, req) => {
  console.log('ws connected');
  ws.send('Connected successfully!');
  ws.on('message', msg => {
    try {
      const message = JSON.parse(msg);
      switch (message.method) {
        case 'connection':
          connectionHandler(ws, message, aWss);
          break;
      }
    } catch (e) {
      console.log(msg);
    }
  });
});

app.listen(PORT, () => console.log(`Server starts on http://localhost:${PORT}`));
