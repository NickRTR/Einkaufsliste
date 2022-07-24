import supabase from "$lib/supabase";

export async function GET() {
	await supabase.auth.signOut();

	return {
		status: 303,
		headers: {
			location: "/auth/login"
		}
	};
}
