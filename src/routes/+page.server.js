import { supabase } from "$lib/supabase";
import { redirect } from "@sveltejs/kit";

export async function load({ locals }) {
	const session = await locals.getSession();

	if (!session) {
		redirect(303, "/login");
	}

	const { data: products, error } = await supabase
		.from("products_duplicate")
		.select(`*, categories(category, sort)`)
		.eq("uuid", session.user.id);

	if (error) {
		console.error("Error fetching products:", error);
		return;
	}

	const sortedProducts = products.sort((a, b) => a.categories.sort - b.categories.sort);

	const { data: categories } = await supabase
		.from("categories")
		.select()
		.eq("uuid", session.user.id);

	return {
		products: sortedProducts ?? [],
		categories: categories ?? []
	};
}
