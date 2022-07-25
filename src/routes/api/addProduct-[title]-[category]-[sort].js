import supabase from "$lib/supabase";
import * as cookie from "cookie";

export async function GET({ params, request }) {
	const { title, category, sort } = params;

	const cookieHeader = request.headers.get("cookie");
	const cookies = cookie.parse(cookieHeader ?? "");

	const { user } = await supabase.auth.api.getUser(cookies.session);

	const { data, error } = await supabase.from("products").insert([{ title, uuid: user.id, category, sort }]);

	if (error) {
		return {
			status: error.status,
			body: {
				error: error.message
			}
		};
	}

	return {
		status: 200,
		body: {
			data
		}
	};
}
