import { redirect } from "@sveltejs/kit";
import { error } from "@sveltejs/kit";

export async function load(event) {
	const { session, supabase } = await event.parent();
	if (!session) {
		throw redirect(303, "/login");
	}

	const { data: priorities, error: err } = await supabase.from("userdata").select("priorities");

	if (err) throw error(500, err.message);

	return {
		supabase,
		user: session.user,
		priorities: priorities[0].priorities
	};
}
