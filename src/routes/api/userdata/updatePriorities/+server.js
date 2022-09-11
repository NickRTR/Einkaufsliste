import supabase from "$lib/supabase";

export async function POST({ request }) {
	const { priorities, id } = await request.json();

	const { error } = await supabase.from("userdata").update({ priorities }).eq("uuid", id);

	if (error) {
		return new Response(JSON.stringify({ error: error.message }));
	}

	return new Response(JSON.stringify({ success: "success" }));
}
