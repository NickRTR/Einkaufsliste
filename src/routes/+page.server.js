import { supabase } from "$lib/supabase";
import { redirect } from "@sveltejs/kit";

export async function load({ locals }) {
	const session = await locals.getSession();

	if (!session) {
		redirect(303, "/login");
	}

	const { data: products } = await supabase
		.from("products")
		.select()
		.eq("uuid", session.user.id)
		.order("sort");
	const { data: categories } = await supabase
		.from("categories")
		.select()
		.eq("uuid", session.user.id);

	return {
		products: products ?? [],
		categories: categories ?? []
	};
}
