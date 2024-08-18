import jwt from "jsonwebtoken";
import { SECRET_JWT_KEY } from "$env/static/private";
import type { Cookies } from "@sveltejs/kit";

export function authenticate(cookies: Cookies): authMC | undefined {
	let token = cookies.get("auth-token");
	if (!token) return undefined;
	try {
		const auth = jwt.verify(token, SECRET_JWT_KEY);
		if (!auth) return undefined;
		return auth as authMC;
	} catch {
		return undefined;
	}
}
