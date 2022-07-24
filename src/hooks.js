import supabase from "$lib/supabase";

export async function handle({ event, resolve }) {
	const user = supabase.auth.user();

	if (!user) {
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
