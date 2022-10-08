import supabase from "$lib/supabase";

export async function PATCH({ request }) {
	const { id, title, category, sort } = await request.json();

	const { error } = await supabase.from("products").update({ title, category, sort }).eq("id", id);

	if (error) {
		return new Response(JSON.stringify({ error: error.message }));
	}

	return new Response(JSON.stringify({ success: "success" }));
}
