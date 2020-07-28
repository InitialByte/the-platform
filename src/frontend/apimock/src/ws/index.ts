/*
 * Documentation
 * @link https://github.com/websockets/ws/blob/master/doc/ws.md
 */

import {Server} from 'ws';

export const webSocketServer = (server): void => {
  const wsServer = new Server({
    noServer: true,
    path: 'ws',
  });

  server.on('upgrade', (req, socket, head): void => {
    wsServer.handleUpgrade(req, socket, head, (ws) => {
      wsServer.emit('connection', ws, req);
    });
  });

  wsServer.on('connection', (ws): void => {
    ws.on('message', (message: string) => console.log('websocket received: ', message));
    ws.send('WebSocket connected.');

    setInterval((): void => {
      ws.send('Test');
    }, 1000);
  });
};
