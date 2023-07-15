import supabase from "$lib/supabase";

export async function PUT({ request }) {
	const { title, category, sort, id } = await request.json();

	const { data, error } = await supabase.from("products").insert([{ title, category, sort, uuid: id }]);

	if (error) {
		return new Response(JSON.stringify({ error: error.message }));
	}

	return new Response(JSON.stringify({ data }));
}
