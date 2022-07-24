import supabase from "$lib/supabase";

export async function GET({ params }) {
	const { title, category, sort } = params;

	const { data, error } = await supabase.from("products").insert([{ title, uuid: supabase.auth.user().id, category, sort }]);

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
