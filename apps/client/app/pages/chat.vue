<template>
	<form @submit.prevent="sendMessage()">
		<input
			type="text"
			class="border border-zinc-300 resize-none h-16 rounded outline-none px-2"
			v-model="message"
			placeholder="Type a message"
		/>
	</form>
	<div v-for="msg in messages" :key="msg.id">
		[{{ msg.sender }}]: {{ msg.message }}
	</div>
</template>

<script setup lang="ts">
const message = ref("");
const messages = ref<any[]>([]);

const { $websocket } = useNuxtApp();

const sendMessage = () => {
	$websocket.emit("send-message", {
		sender: "Client",
		chatId: "teste",
		message: message.value,
	});

	message.value = "";
};

const fetchMessages = () => {
	$websocket.emit("get-messages");
};

onMounted(() => {
	fetchMessages();

	$websocket.on("connect", () => {
		console.log("Connected to WebSocket server");
	});

	$websocket.on("disconnect", () => {
		console.log("Disconnected from WebSocket server");
	});

	$websocket.on("messages", (msgs) => {
		messages.value = msgs;
	});
});
</script>
