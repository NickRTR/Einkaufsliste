import supabase from "$lib/supabase";

export async function GET({ params }) {
	let { title } = params;

	let { data: products, error } = await supabase.from("products").select("*").eq("title", title);

	if (error) {
		return new Response(JSON.stringify({ error: error.message }));
	}

	return new Response(JSON.stringify({ products }));
}
