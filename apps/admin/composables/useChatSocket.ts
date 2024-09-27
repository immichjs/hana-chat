// composables/useSocket.js
import { ref } from 'vue';
import { io } from 'socket.io-client';
import type { Message } from '~/interfaces/message.interface';

const socket = io('http://localhost:3001');

export function useSocket() {
	const isConnected = ref(false);

	socket.on('connect', () => {
		isConnected.value = true;
	});

	socket.on('disconnect', () => {
		isConnected.value = false;
	});
	return {
		socket,
		isConnected,
	};
}
