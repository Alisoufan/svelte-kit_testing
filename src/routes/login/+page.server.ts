import { fail } from "@sveltejs/kit";
import type { Actions } from "./$types";
import { login_user } from "$lib/server/login";
import { cookie_options } from "$lib/server/utils";
import { redirect } from '@sveltejs/kit';
import  dns  from 'dns/promises';
import { saveLog } from "$lib/server/savelog";
//import { format } from 'date-fns';
//import { de } from 'date-fns/locale';

export const actions: Actions = {
	default: async (event) => {

		const data = await event.request.formData();

		const email = (data.get("email") as string)
			?.toLowerCase()
			?.trim();
		const password = data.get("password") as string;

		const user_data = await login_user(email, password);
			
		// Retrieve client IP address
		const ip = event.request.headers.get('x-forwarded-for') || event.getClientAddress();
		const timenow = new Date();
		// Attempt to resolve the hostname (optional)
		let hostname = 'Unknown';
	 	try {
			const hostnames = await dns.reverse(ip);
			hostname = hostnames[0] || 'Unknown';
		} catch (err) {
			console.error('Hostname resolution error:', err);
		} 

		if ("error" in user_data) {
			saveLog(email,"","",timenow,user_data.error,ip,hostname)
			return fail(400, { email, error: user_data.error });
		} else {
			const { token, user } = user_data;

			event.cookies.set("auth-token", token, cookie_options);
			event.cookies.set("email", user.email, cookie_options);
			event.cookies.set("name", user.name, cookie_options);
			console.log(timenow)
			console.log(timenow.toString())
			saveLog(user.email,"ssoEmail",user.name,timenow,"Successful login",ip,hostname);
			return { email, user };
		}

		
	}
};


