const ws = require('ws');
const uuid = require('uuid');
const wss = new ws.Server({ port: 8000 });

const clients = {};

wss.on('connection', (ws) => {
  const id = uuid.v4();
  clients[id] = ws;

  console.log(`New client ${id}`);

  ws.on('message', (rawData) => {
    const { name, message } = JSON.parse(rawData);
    console.log('ping', name, message);
    for (const id in clients) {
      clients[id].send(rawData.toString());
    }
  });

  ws.on('close', () => {
    delete clients[id];
    console.log(`Client is closed: ${id}`);
  });
});
