import supabase from "$lib/supabase";

export async function GET({ locals }) {
	let { error } = await supabase.from("userdata").insert([{ uuid: locals.user.id }]);

	if (error) {
		return {
			status: error.status,
			body: {
				error: error.message
			}
		};
	}

	return {
		status: 200
	};
}
