import type { Handle } from "@sveltejs/kit"

export const handle: Handle = async ({ event, resolve }) => {
	const darkmodeCookie = event.cookies.get("__theme")
	const mode = darkmodeCookie === undefined || darkmodeCookie === "dark"

	return await resolve(event, {
		transformPageChunk(input) {
			return input.html.replace("%DARKMODE%", mode ? "dark" : "light")
		},
	})
}
