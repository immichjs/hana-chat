// src/chat/schemas/chat.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Message, MessageSchema } from './message.schema';

export type ChatDocument = Chat & Document;

@Schema({ timestamps: true })
export class Chat {
	@Prop({ type: [{ type: MessageSchema }] })
	messages: Message[];
}

export const ChatSchema = SchemaFactory.createForClass(Chat);
