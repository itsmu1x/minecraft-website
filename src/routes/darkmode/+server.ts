import { json, type RequestHandler } from "@sveltejs/kit"

export const PATCH: RequestHandler = async ({ cookies }) => {
	const darkmodeCookie = cookies.get("__theme")
	const mode = !(darkmodeCookie === undefined || darkmodeCookie === "dark")
	cookies.set("__theme", `${mode ? "dark" : "light"}`, {
		path: "/",
		sameSite: "lax",
		expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30 * 6),
		secure: process.env.NODE_ENV === "production",
	})

	return json({
		mode,
	})
}
