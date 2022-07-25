import supabase from "$lib/supabase";
import * as cookie from "cookie";

export async function GET({ params, request }) {
	const { changedPriorities } = params;

	const cookieHeader = request.headers.get("cookie");
	const cookies = cookie.parse(cookieHeader ?? "");

	const { user } = await supabase.auth.api.getUser(cookies.session);

	const priorities = changedPriorities.split(",");

	const { error } = await supabase.from("userdata").update({ priorities }).eq("uuid", user.id);

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
