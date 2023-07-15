import supabase from "$lib/supabase";

export async function GET({ params }) {
	let { title } = params;
	title = title.toLowerCase();

	let { data: categories, error: categoryError } = await supabase.from("userdata").select("categories");

	if (categoryError) {
		return new Response(JSON.stringify({ error: categoryError.message }));
	}

	let { data: priorities, error: priorityError } = await supabase.from("userdata").select("priorities");

	if (priorityError) {
		return new Response(JSON.stringify({ error: priorityError.message }));
	}

	categories = categories[0].categories;
	priorities = priorities[0].priorities;

	// first, check if there's an explicit fit
	for (let i = 0; i < priorities.length; i++) {
		if (categories[priorities[i]].includes(title)) {
			let category = priorities[i];
			return new Response(JSON.stringify({ category }));
		}
	}

	// then check if there's an other not perfect fitting entry
	for (let i = 0; i < priorities.length; i++) {
		for (let y = 0; y < categories[priorities[i]].length; y++) {
			let product = categories[priorities[i]];
			if (product[y].includes(title) || title.includes(product[y])) {
				let category = priorities[i];
				return new Response(JSON.stringify({ category }));
			}
		}
	}

	return new Response(JSON.stringify({ category: "choose" }));
}
