import supabase from "$lib/supabase";

export async function POST({ request, locals }) {
	const { categories } = await request.json();

	const { error } = await supabase.auth.api.updateUserById(locals.user.id, { user_metadata: { categories } });

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
