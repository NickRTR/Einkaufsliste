import supabase from "$lib/supabase";

export async function GET({ params }) {
	const { title, category, sort } = params;

	const { data, error } = await supabase.from("products").insert([{ title, uuid: supabase.auth.user().id, category, sort }]);

	if (error) {
		return new Response(JSON.stringify({ error: error.message }));
	}

	return new Response(JSON.stringify({ data }));
}
