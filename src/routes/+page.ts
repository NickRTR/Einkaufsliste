import type { Product } from "$lib/types/product.type";
import { redirect } from "@sveltejs/kit";

export async function load(event) {
	const { session, supabase } = await event.parent();
	if (!session) {
		throw redirect(303, "/login");
	}

	const res = await supabase.from("products").select("*").order("sort", { ascending: true });
	if (res.error) {
		return {
			error: res.error.message
		};
	}

	const products: Product[] = res.data;

	return {
		supabase,
		products,
		user: session.user
	};
}
