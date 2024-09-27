<template>
	<section class="flex-1 h-screen bg-white">
		<section class="w-full h-full" v-if="selectedChat">
			<section
				class="flex justify-between items-center border-b p-4 bg-zinc-900 text-white"
			>
				<h2>Protocólo: {{ selectedChat._id }}</h2>

				<button class="border px-3 rounded py-1.5" @click="closeChat()">
					Fechar
				</button>
			</section>

			<ul
				ref="messageList"
				class="h-[calc(100%-9.5rem)] flex flex-col gap-4 p-6 overflow-y-auto"
			>
				<li
					class="relative bg-zinc-900 text-white px-4 py-2 rounded-2xl max-w-[32rem]"
					:class="message.sender === 'Usuário' ? 'self-end' : 'self-start'"
					v-for="message in selectedChat.messages"
					:key="message._id"
				>
					{{ message.content }}
				</li>
			</ul>

			<form
				class="flex gap-1.5 border-t items-center h-20 px-3"
				@submit.prevent="sendMessage"
			>
				<input
					type="text"
					class="border py-2 rounded-lg w-full px-2.5"
					v-model="messageInput"
				/>

				<button class="bg-zinc-900 text-white font-bold py-2 px-4 rounded-lg">
					Enviar
				</button>
			</form>
		</section>

		<section v-else>
			<p class="text-zinc-500 m-4">Nenhum chat selecionado.</p>
		</section>
	</section>
</template>

<script setup lang="ts">
import { ref, watch, onMounted, nextTick } from 'vue';
import type { Chat } from '~/interfaces/chat.interface';

const selectedChat = useState<Chat | null>('selectedChat');
const messageInput = ref(''); // Para armazenar a mensagem a ser enviada
const messageList = ref<HTMLElement | null>(null); // Referência ao container de mensagens
const { socket } = useSocket(); // Usando a composable para conectar ao WebSocket

const closeChat = () => {
	selectedChat.value = null;
};

// Função para enviar a mensagem via WebSocket
const sendMessage = () => {
	if (messageInput.value.trim() && selectedChat.value) {
		const messageData = {
			content: messageInput.value,
			sender: 'Usuário',
			chatId: selectedChat.value._id,
		};

		// Emitir a mensagem pelo WebSocket
		socket.emit('sendMessage', messageData);

		// Limpar o campo de entrada
		messageInput.value = '';
	}
};

// Listener para novas mensagens recebidas
socket.on('newMessage', (chat: Chat) => {
	if (selectedChat.value) {
		selectedChat.value.messages = chat.messages;
		scrollToBottom(); // Chama a função para rolar para baixo quando uma nova mensagem chega
	}
});

// Função para rolar para o fundo
const scrollToBottom = () => {
	nextTick(() => {
		if (messageList.value) {
			messageList.value.scrollTop = messageList.value.scrollHeight;
		}
	});
};

// Watcher para auto-scroll quando novas mensagens chegarem
watch(
	() => selectedChat.value?.messages,
	() => {
		scrollToBottom(); // Chama a função de rolagem sempre que as mensagens mudam
	},
);
</script>

<style scoped>
/* width */
::-webkit-scrollbar {
	@apply w-2;
}

/* Track */
::-webkit-scrollbar-track {
	background: #f1f1f1;
}

/* Handle */
::-webkit-scrollbar-thumb {
	@apply bg-zinc-900 rounded-full;
}
</style>
