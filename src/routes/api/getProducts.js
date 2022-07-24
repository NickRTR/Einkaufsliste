import supabase from "$lib/supabase";

export async function GET() {
	let { data: products, error } = await supabase.from("products").select("*").order("sort", { ascending: true });

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
			products
		}
	};
}
