import supabase from "$lib/supabase";
import { redirect } from "@sveltejs/kit";

export async function GET({ cookies }) {
	await supabase.auth.signOut();

	cookies.set("auth", "", { path: "/", expires: new Date(0) });

	throw redirect(302, "/auth/login");
}
