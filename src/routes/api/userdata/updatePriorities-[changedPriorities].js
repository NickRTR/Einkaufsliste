import supabase from "$lib/supabase";

export async function GET({ params, locals }) {
	const { changedPriorities } = params;

	const priorities = changedPriorities.split(",");

	const { error } = await supabase.auth.api.updateUserById(locals.user.id, { user_metadata: { priorities } });

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
