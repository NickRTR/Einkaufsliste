import supabase from "$lib/supabase";

export async function GET() {
	let { data: products, error } = await supabase.from("products").select("*").order("sort", { ascending: true });

	if (error) {
		return new Response(JSON.stringify({ error: error.message }));
	}

	return new Response(JSON.stringify({ products }));
}
