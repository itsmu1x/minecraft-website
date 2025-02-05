import type { LayoutServerLoad } from "./$types"

export const load: LayoutServerLoad = async ({ cookies }) => {
	const darkmodeCookie = cookies.get("__theme")
	const mode = darkmodeCookie === undefined || darkmodeCookie === "dark"

	return {
		mode,
	}
}
