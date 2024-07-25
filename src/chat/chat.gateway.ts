import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';

@WebSocketGateway(81, { namespace: 'events', cors: { origin: '*' } })
export class ChatGateway implements OnGatewayConnection {
  handleConnection(client: Socket) {
    console.log('client connected', client.id);
  }
  @WebSocketServer()
  private server: Server;

  @SubscribeMessage('events')
  handleMessage(
    @MessageBody() message: string,
    @ConnectedSocket() client: Socket,
  ): void {
    console.log('message', message);
    client;
    this.server.emit('message', `Server response ${message}`);
  }
}
