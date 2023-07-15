import supabase from "$lib/supabase";

export async function GET() {
	let { data: categories, error } = await supabase.from("userdata").select("categories");

	if (error) {
		return new Response(JSON.stringify({ error: error.message }));
	}

	return new Response(JSON.stringify({ categories: categories[0].categories }));
}
