export async function GET({ parent }) {
	// const { supabase } = await parent();
	// let { data: products, error } = await supabase
	// 	.from("products")
	// 	.select("*")
	// 	.order("sort", { ascending: true });

	// if (error) {
	// 	return new Response(JSON.stringify({ error: error.message }));
	// }

	// return new Response(JSON.stringify({ products }));

	return new Response(JSON.stringify({ success: "success" }));
}
