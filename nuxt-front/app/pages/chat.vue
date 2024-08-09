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
		{{ msg.sender }}: {{ msg.text }}
	</div>
</template>

<script setup lang="ts">
const message = ref("");
const messages = ref<any[]>([]);

const { $websocket } = useNuxtApp();

const sendMessage = () => {
	if ($websocket.connected) {
		console.log("Sending message:", message.value);
		$websocket.emit("message", { sender: "User", text: message.value });
		message.value = "";
	} else {
		console.error("Socket not connected");
	}
};

onMounted(() => {
	$websocket.on("connect", () => {
		console.log("Connected to WebSocket server");
	});

	$websocket.on("disconnect", () => {
		console.log("Disconnected from WebSocket server");
	});

	$websocket.on("message", (data) => {
		console.log("Received message:", data);
		messages.value.push(data);
	});
});
</script>
