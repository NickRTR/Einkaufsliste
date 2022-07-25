import supabase from "$lib/supabase";

export async function POST({ request, locals }) {
	const { categories } = await request.json();

	const { error } = await supabase.from("userdata").update({ categories }).eq("uuid", locals.user.id);

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
