import supabase from "$lib/supabase";

export async function POST({ request }) {
	const { categories } = await request.json();

	const { error } = await supabase.auth.api.updateUserById(supabase.auth.user().id, { user_metadata: { categories } });

	if (error) {
		return new Response(JSON.stringify({ error: error.message }));
	}

	return new Response(JSON.stringify({ success: "success" }));
}
