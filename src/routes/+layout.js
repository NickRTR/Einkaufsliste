import { PUBLIC_SUPABASE_ANON_KEY, PUBLIC_SUPABASE_URL } from "$env/static/public";
import { createSupabaseLoadClient } from "@supabase/auth-helpers-sveltekit";

import "$lib/i18n";
import { waitLocale } from "svelte-i18n";

export const load = async ({ fetch, data, depends, cookies }) => {
	depends("supabase:auth");

	const supabase = createSupabaseLoadClient({
		supabaseUrl: PUBLIC_SUPABASE_URL,
		supabaseKey: PUBLIC_SUPABASE_ANON_KEY,
		event: { fetch },
		serverSession: data.session
	});

	const {
		data: { session }
	} = await supabase.auth.getSession();

	await waitLocale();

	return { supabase, session };
};
