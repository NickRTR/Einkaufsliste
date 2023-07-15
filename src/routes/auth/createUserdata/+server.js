import supabase from "$lib/supabase";

export async function POST({ request }) {
	const { id } = await request.json();
	let { error } = await supabase.from("userdata").insert([{ uuid: id }]);

	if (error) {
		return new Response(JSON.stringify({ error: error.message }));
	}

	return new Response(JSON.stringify({ success: "success" }));
}
