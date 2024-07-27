import {
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';

@WebSocketGateway()
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  private server: Server;
  private activeUsers = new Map<string, Socket>()
  
  handleDisconnect(client: Socket) {
    const userId = this.getUserId(client);
    this.activeUsers.delete(userId)
  }
  handleConnection(client: Socket) {
    const userId = this.getUserId(client);
    this.activeUsers.set(userId, client)
  }

  @SubscribeMessage('message')
  handleMessage(
    @MessageBody() message: { chatId: string, content: string },
  ): void {
    const { chatId } = message;
    const users = this.getUsersInChat(chatId)
    users.forEach(user => {
      const clientSocket = this.activeUsers.get(user);
      if (clientSocket) clientSocket.emit('message', message)
    })
  }

  getUserId(client: Socket) {
    return client.id
  }

  getUsersInChat(chatId: string) {
    return [chatId]
  }
}
