import supabase from "$lib/supabase";

export async function GET({ params }) {
	const { changedPriorities } = params;

	const priorities = changedPriorities.split(",");

	const { error } = await supabase.auth.api.updateUserById(supabase.auth.user().id, { user_metadata: { priorities } });

	if (error) {
		return new Response(JSON.stringify({ error: error.message }));
	}

	return new Response(JSON.stringify({ success: "success" }));
}
