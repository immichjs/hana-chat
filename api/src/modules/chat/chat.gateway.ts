import {
	OnGatewayConnection,
	OnGatewayDisconnect,
	OnGatewayInit,
	SubscribeMessage,
	WebSocketGateway,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({
	cors: {
		origin: '*',
		methods: ['GET', 'POST'],
	},
})
export class ChatGateway
	implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
	private server: Server;

	afterInit(server: Server) {
		this.server = server;
		console.log('WebSocket server initialized');
	}

	handleConnection(client: Socket) {
		console.log(`Client connected: ${client.id}`);
	}

	handleDisconnect(client: Socket) {
		console.log(`Client disconnected: ${client.id}`);
	}

	@SubscribeMessage('message')
	handleMessage(client: Socket, payload: { sender: string; text: string }) {
		console.log(client);
		console.log(`Message from ${payload.sender}: ${payload.text}`);
		this.server.emit('message', payload);
	}
}
