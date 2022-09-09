import supabase from "$lib/supabase";

export async function GET({ cookies }) {
	const user = await supabase.auth.api.getUser(cookies.get("auth"));

	const categories = user.user.user_metadata.categories;

	return new Response(JSON.stringify({ categories }));
}
