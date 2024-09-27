import type { Message } from './message.interface';

export interface Chat {
	_id: string;
	messages: Message[];
	createdAt: Date;
	updatedAt: Date;
}
