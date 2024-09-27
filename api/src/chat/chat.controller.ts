import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ChatService } from './chat.service';
import { Chat } from './schemas/chat.schema';

@Controller('chats')
export class ChatController {
	constructor(private readonly chatService: ChatService) {}

	@Post()
	async create(@Body('name') name: string): Promise<Chat> {
		return this.chatService.create(name);
	}

	@Get()
	async find(): Promise<Chat[]> {
		return this.chatService.find();
	}

	@Get(':id')
	async findById(@Param('id') id: string): Promise<Chat> {
		return this.chatService.findById(id);
	}
}
