import supabase from "$lib/supabase";

export async function GET() {
	let { data: products, error } = await supabase.from("products").delete().neq("id", 0);

	products.toLocaleString([]);

	if (error) {
		return new Response(JSON.stringify({ error: error.message }));
	}

	return new Response(JSON.stringify({ success: "success" }));
}
