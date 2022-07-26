import supabase from "$lib/supabase";

export async function GET({ params }) {
	let { title } = params;

	let { data: products, error } = await supabase.from("products").select("*").eq("title", title);

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
			product: products[0]
		}
	};
}
