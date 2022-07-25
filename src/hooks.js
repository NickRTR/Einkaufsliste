import supabase from "$lib/supabase";
import * as cookie from "cookie";

export async function handle({ event, resolve }) {
	const cookieHeader = event.request.headers.get("cookie");
	const cookies = cookie.parse(cookieHeader ?? "");

	if (!cookies.session) {
		return await resolve(event);
	}

	const { user, error } = await supabase.auth.setAuth(cookies.session);

	if (error) {
		return await resolve(event);
	}

	event.locals.user = { email: user.email };

	return await resolve(event);
}

export function getSession({ locals }) {
	if (!locals.user) return {};

	return {
		user: {
			email: locals.user.email
		}
	};
}
