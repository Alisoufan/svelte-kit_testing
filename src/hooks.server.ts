import { authenticate } from "$lib/server/authenticate";
import { redirect, type Handle } from "@sveltejs/kit";

export const handle: Handle = async ({ event, resolve }) => {
	const is_protected =
		event.url.pathname.startsWith("/dashboard") ||
		event.url.pathname.startsWith("/account") ||
		event.url.pathname == "/" ||
		event.url.pathname == "" || 
		event.url.pathname == null;

	const auth = authenticate(event.cookies);

	const email = event.cookies.get("email");
	const name = event.cookies.get("name");

	if (is_protected && !auth) {
		if (email) {event.cookies.delete("email", { path: '/' });}
		if (name) {event.cookies.delete("name" ,{ path: '/' });}
		throw redirect(307, "/login");
	}


	const response = await resolve(event);
	return response;
};
