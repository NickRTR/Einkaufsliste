import supabase from "$lib/supabase";

export async function GET({ params }) {
	let { id, category, sort } = params;

	const { error } = await supabase.from("products").update({ category, sort }).eq("id", id);

	if (error) {
		return new Response(JSON.stringify({ error: error.message }));
	}

	return new Response(JSON.stringify({ success: "success" }));
}
