import type { SupabaseClient } from "@supabase/supabase-js";
import type { LayoutLoad } from "./$types";
import type { Database } from "$lib/types/database";
import { PUBLIC_SUPABASE_ANON_KEY, PUBLIC_SUPABASE_URL } from "$env/static/public";
import { createSupabaseLoadClient } from "@supabase/auth-helpers-sveltekit";

export const load: LayoutLoad = async ({ fetch, data, depends }) => {
	depends("supabase:auth");

	const supabase: SupabaseClient<Database> = createSupabaseLoadClient<Database>({
		supabaseUrl: PUBLIC_SUPABASE_URL,
		supabaseKey: PUBLIC_SUPABASE_ANON_KEY,
		event: { fetch },
		serverSession: data.session
	});

	const {
		data: { session }
	} = await supabase.auth.getSession();

	return { supabase, session };
};
