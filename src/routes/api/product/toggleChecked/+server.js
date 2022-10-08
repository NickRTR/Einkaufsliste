import supabase from "$lib/supabase";

export async function PATCH({ request }) {
	let { id, checked } = await request.json();

	let { error } = await supabase
		.from("products")
		.update({ checked: checked === false })
		.eq("id", id);

	if (error) {
		return new Response(JSON.stringify({ error: error.message }));
	}

	return new Response(JSON.stringify({ success: "success" }));
}
