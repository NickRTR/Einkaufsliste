import supabase from "$lib/supabase";

export async function GET() {
	try {
		let { data: products, error } = await supabase.from("products").select("*").order("sort", { ascending: true });

		if (error) throw new Error(error.message);

		return {
			status: 200,
			body: {
				products
			}
		};
	} catch (err) {
		return {
			status: 500,
			body: {
				error: err.message
			}
		};
	}
}
