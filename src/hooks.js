import supabase from "$lib/supabase";
import * as cookie from "cookie";

export async function handle({ event, resolve }) {
	try {
		const cookieHeader = event.request.headers.get("cookie");
		const cookies = cookie.parse(cookieHeader ?? "");

		if (!cookies.session) {
			return await resolve(event);
		}

		await supabase.auth.setAuth(cookies.session);
		const { user, error } = await supabase.auth.api.getUser(cookies.session);

		if (error) {
			return await resolve(event);
		}

		// provide id exclusively to endpoints via locals
		event.locals.user = { email: user.email, id: user.id };

		return await resolve(event);
	} catch (err) {
		console.log(err);
		return await resolve(event);
	}
}

export function getSession({ locals }) {
	if (!locals.user) return {};

	return {
		user: {
			email: locals.user.email
		}
	};
}
