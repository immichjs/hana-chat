import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ChatService } from './chat.service';
import { ChatGateway } from './chat.gateway';
import { Chat, ChatSchema } from '../../database/schemas/chat.schema';
import { Message, MessageSchema } from '../../database/schemas/message.schema';
import { ChatController } from './chat.controller';

@Module({
	imports: [
		MongooseModule.forFeature([{ name: Chat.name, schema: ChatSchema }]),
		MongooseModule.forFeature([{ name: Message.name, schema: MessageSchema }]),
	],
	providers: [ChatService, ChatGateway],
	controllers: [ChatController],
})
export class ChatModule {}
