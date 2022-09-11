import { parse } from "cookie";
import supabase from "$lib/supabase";

export async function load({ request }) {
	const cookieString = request.headers.get("cookie");
	if (cookieString !== null) {
		const cookies = parse(cookieString);
		if (cookies.auth) {
			const { user, error } = await supabase.auth.api.getUser(cookies.auth);

			if (user.user_metadata !== {}) {
				await supabase.auth.api.updateUserById(user.id, {
					user_metadata: {}
				});
			}

			if (error) {
				console.log(error);
			}

			return {
				user: {
					email: user.email,
					id: user.id
				}
			};
		}
	}
}
