import { supabase } from "$lib/supabase";
import { redirect } from "@sveltejs/kit";

export const load = async ({ parent }) => {
	const { session } = await parent();

	if (!session) {
		redirect(303, "/login");
	}

	const { data, error } = await supabase
		.from("categories")
		.select("category")
		.eq("uuid", session.user.id)
		.order("sort");
	if (error) {
		console.error("Error fetching categories:", error);
		return;
	}

	const priorities = data.map((item) => item.category);

	return { priorities };
};
