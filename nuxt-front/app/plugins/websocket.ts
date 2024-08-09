import io from "socket.io-client";

export default defineNuxtPlugin((nuxtApp) => {
	const config = useRuntimeConfig();
	const URL = config.public.baseURL || "http://localhost:4000";
	const websocket = io(URL);

	return {
		provide: {
			websocket,
		},
	};
});
