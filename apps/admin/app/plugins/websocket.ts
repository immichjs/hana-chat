import io from "socket.io-client";

export default defineNuxtPlugin((nuxtApp) => {
	const config = useRuntimeConfig();
	const URL = config.public.wsURL || "ws://localhost:4000";
	const websocket = io(URL);

	return {
		provide: {
			websocket,
		},
	};
});
