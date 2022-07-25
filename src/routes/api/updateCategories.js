import supabase from "$lib/supabase";
import * as cookie from "cookie";

export async function POST({ request }) {
	const { categories } = await request.json();

	const cookieHeader = request.headers.get("cookie");
	const cookies = cookie.parse(cookieHeader ?? "");

	const { user } = await supabase.auth.api.getUser(cookies.session);

	const { error } = await supabase.from("userdata").update({ categories }).eq("uuid", user.id);

	if (error) {
		return {
			status: error.status,
			body: {
				error: error.message
			}
		};
	}

	return {
		status: 200
	};
}
