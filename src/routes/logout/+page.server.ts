import { redirect } from "@sveltejs/kit";
import type { Actions } from "./$types";
import  dns  from 'dns/promises';
import { saveLog } from "$lib/server/savelog";

export const actions: Actions = {
	default: async (event) => {
		// Check if the cookies exist before deleting them

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
		


		const authToken = event.cookies.get("auth-token");
		const email = event.cookies.get("email");
		const name = event.cookies.get("name");
		if (process.env.DebugFlag)	console.log("authToken: " +authToken )
		if (authToken) {
			event.cookies.delete("auth-token", { path: '/' } );
		}
		if (process.env.DebugFlag) console.log("email: " +email )
		if (email) {
			event.cookies.delete("email", { path: '/' });
		}
		if (process.env.DebugFlag) console.log("name: " +name )
		if (name) {
			event.cookies.delete("name", { path: '/' });
		}

		saveLog(email?email:"not found in cookies","ssoEmail",name,timenow.toString(),"logged out Successfully",ip,hostname);


		// Redirect to the homepage
		throw redirect(301, "/");
	}
};