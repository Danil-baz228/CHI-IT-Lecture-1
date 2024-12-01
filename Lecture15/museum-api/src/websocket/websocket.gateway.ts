import {
    WebSocketGateway,
    WebSocketServer,
    SubscribeMessage,
    MessageBody,
    OnGatewayInit,
    OnGatewayConnection,
    OnGatewayDisconnect,
  } from '@nestjs/websockets';
  import { Server, Socket } from 'socket.io';
  
  @WebSocketGateway({ cors: true })
  export class WebsocketGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
    @WebSocketServer()
    server: Server;
  
    afterInit(server: Server) {
      console.log('WebSocket Gateway initialized');
    }
  
    handleConnection(client: Socket) {
      console.log(`Client connected: ${client.id}`);
    }
  
    handleDisconnect(client: Socket) {
      console.log(`Client disconnected: ${client.id}`);
    }
  
    @SubscribeMessage('newComment')
    handleNewComment(@MessageBody() data: any) {
      console.log('Received new comment:', data);
      this.server.emit('commentNotification', data);
    }
  }
  