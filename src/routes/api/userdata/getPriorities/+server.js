import supabase from "$lib/supabase";

export async function GET({ cookies }) {
	const user = await supabase.auth.api.getUser(cookies.get("auth"));

	const priorities = user.user.user_metadata.priorities;

	return new Response(JSON.stringify({ priorities }));
}
