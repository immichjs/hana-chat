import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Chat } from '../../database/schemas/chat.schema';
import { Message } from '../../database/schemas/message.schema';

@Injectable()
export class ChatService {
	constructor(@InjectModel(Chat.name) private chatModel: Model<Chat>) {}

	async create(name: string): Promise<Chat> {
		const chat = new this.chatModel({ name });
		return chat.save();
	}

	async find(): Promise<Chat[]> {
		return this.chatModel.find().populate('messages');
	}

	async findById(id: string): Promise<Chat> {
		return this.chatModel.findById(id).populate('messages');
	}

	async addMessage(
		chatId: string,
		messageData: { content: string; sender: string },
	): Promise<Chat> {
		const chat = await this.chatModel.findById(chatId);
		chat.messages.push(messageData);
		await chat.save();
		return chat;
	}
}
