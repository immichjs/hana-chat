// src/chat/chat.gateway.ts
import {
	SubscribeMessage,
	WebSocketGateway,
	WebSocketServer,
	OnGatewayInit,
	OnGatewayConnection,
	OnGatewayDisconnect,
} from '@nestjs/websockets';
import { ChatService } from './chat.service';
import { Server } from 'socket.io';

@WebSocketGateway({
	cors: {
		origin: '*',
	},
})
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
	@WebSocketServer()
	server: Server;

	constructor(private readonly chatService: ChatService) {}

	handleConnection(client: any) {
		console.log(`Client connected: ${client.id}`);
	}

	handleDisconnect(client: any) {
		console.log(`Client disconnected: ${client.id}`);
	}

	@SubscribeMessage('sendMessage')
	async handleMessage(
		client: any,
		payload: { chatId: string; content: string; sender: string },
	): Promise<void> {
		const chat = await this.chatService.addMessage(payload.chatId, payload);
		console.log(chat);
		this.server.emit('newMessage', chat);
	}
}
