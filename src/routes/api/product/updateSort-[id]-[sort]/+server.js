import { json } from "@sveltejs/kit";
import supabase from "$lib/supabase";

export async function GET({ params }) {
	let { id, sort } = params;

	const { error } = await supabase.from("products").update({ sort }).eq("id", id);

	if (error) {
		return new Response(JSON.stringify({ error: error.message }));
	}

	return new Response(JSON.stringify({ success: "success" }));
}
