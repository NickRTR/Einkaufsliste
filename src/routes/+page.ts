import type { PageLoad } from "./$types";
import { redirect } from "@sveltejs/kit";

export const load: PageLoad = async (event) => {
	const { session, supabase } = await event.parent();
	if (!session) {
		throw redirect(303, "/login");
	}

	let { data: products, error: err } = await supabase
		.from("products")
		.select("*")
		.order("sort", { ascending: true });

	if (err) {
		return {
			error: err.message
		};
	}

	return {
		supabase,
		products,
		user: session.user
	};
};
