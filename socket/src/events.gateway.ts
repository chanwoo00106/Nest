import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';

@WebSocketGateway()
export class EventGateway {
  @WebSocketServer()
  server;

  @SubscribeMessage('hi')
  getHello(@MessageBody() message: string): void {
    this.server.emit('message', message + ' : hello!');
  }
}
