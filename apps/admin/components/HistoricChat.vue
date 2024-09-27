<template>
	<div class="border-r bg-zinc-50 p-4 w-96 h-screen">
		<h2 class="text-lg font-semibold mb-2">Meus chats</h2>
		<ul class="space-y-2 overflow-y-auto">
			<li
				v-for="chat in chats"
				:key="chat._id"
				class="cursor-pointer p-2 hover:bg-zinc-900 hover:text-white rounded transition"
				@click="selectChat(chat)"
			>
				<span class="text-xs">[{{ chat.createdAt }}]</span>
				{{ chat._id }}
			</li>
		</ul>
	</div>
</template>

<script setup lang="ts">
import type { Chat } from '~/interfaces/chat.interface';

const chats = ref<Chat[]>([]);

const fetchHistoric = async () => {
	chats.value = await $fetch<Chat[]>('http://localhost:3001/chats', {
		method: 'GET',
	});
};

const selectChat = (chat: Chat) => {
	const selectedChat = useState('selectedChat');
	selectedChat.value = chat;
};

onMounted(() => {
	fetchHistoric();
});
</script>
