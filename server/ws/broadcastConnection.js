const broadcastConnection = (ws, msg, aWss) => {
  aWss.clients.forEach(client => {
    if (client.id === msg.id) {
      client.send(`Пользователь ${msg.username} подключен`);
    }
  });
};

module.exports = { broadcastConnection };
