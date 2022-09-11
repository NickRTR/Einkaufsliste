import supabase from "$lib/supabase";

export async function GET({ params, cookies }) {
	let { category } = params;

	let { data: priorities, error: priorityError } = await supabase.from("userdata").select("priorities");

	if (priorityError) {
		return new Response(JSON.stringify({ error: priorityError.message }));
	}

	priorities = priorities[0].priorities;

	if (category === "choose") {
		return new Response(JSON.stringify({ sort: 0 }));
	}

	for (let i = 0; i <= Object.keys(priorities).length; i++) {
		if (priorities[i] === category) {
			return new Response(JSON.stringify({ sort: i + 1 }));
		}
	}

	return new Response(JSON.stringify({ error: "Invalid category" }));
}
