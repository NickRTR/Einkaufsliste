import supabase from "$lib/supabase";
import { products } from "$lib/stores";

export async function GET() {
	let { data: products, error } = await supabase.from("products").delete().neq("id", 0);

	products.toLocaleString([]);

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
