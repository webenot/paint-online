const fs = require('fs');
const path = require('path');

const express = require('express');
const cors = require('cors');

const { broadcastConnection } = require('ws/broadcastConnection');
const { connectionHandler } = require('methods/connection');

const app = express();
const wsServer = require('express-ws')(app);
const aWss = wsServer.getWss();

const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.ws('/', ws => {
  console.log('ws connected');
  ws.send('Connected successfully!');
  ws.on('message', msg => {
    try {
      const message = JSON.parse(msg);
      switch (message.method) {
        case 'connection':
          connectionHandler(ws, message, aWss);
          break;
        case 'draw':
          broadcastConnection(ws, message, aWss);
          break;
      }
    } catch (e) {
      console.log(msg);
    }
  });
});

app.post('/image', (req, res) => {
  const replace = 'data:image/png;base64,';
  try {
    const data = req.body.img.replace(replace, '');
    fs.writeFileSync(path.resolve(__dirname, 'files', `${req.query.id}.jpg`), data, 'base64');
    res.status(200).json('Success');
  } catch (e) {
    console.error(e);
    res.status(500).json('Error');
  }
});
app.get('/image', (req, res) => {
  try {
    const data = fs.readFileSync(path.resolve(__dirname, 'files', `${req.query.id}.jpg`), 'base64');
    res.json({ img: 'data:image/png;base64,' + data });
  } catch (e) {
    console.error(e);
    res.status(500).json('Error');
  }
});

app.listen(PORT, () => console.log(`Server starts on http://localhost:${PORT}`));
