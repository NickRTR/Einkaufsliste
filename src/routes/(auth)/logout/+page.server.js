import { redirect } from '@sveltejs/kit';

export const load = async ({ locals }) => {
	await locals.supabase.auth.signOut();
	throw redirect(303, '/');
};

export const actions = {
	async default({ locals: { supabase } }) {
		await supabase.auth.signOut();
		throw redirect(303, '/');
	}
};
