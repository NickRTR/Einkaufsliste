import supabase from "$lib/supabase";

export async function GET({ params, cookies }) {
	let { title } = params;
	title = title.toLowerCase();

	const user = await supabase.auth.api.getUser(cookies.get("auth"));

	const priorities = user.user.user_metadata.priorities;
	const categories = user.user.user_metadata.categories;

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
