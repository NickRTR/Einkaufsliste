import supabase from "$lib/supabase";

export async function GET() {
	let { data: categories, error } = await supabase.from("userdata").select("categories");

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
			categories: categories[0].categories
		}
	};
}
