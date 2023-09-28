import { AuthApiError } from "@supabase/supabase-js";
import { fail, redirect } from "@sveltejs/kit";

export const actions = {
	default: async ({ request, locals }) => {
		const formData = await request.formData();

		const email = formData.get("email");
		const password = formData.get("password");

		if (!email) {
			return fail(400, {
				error: "Please enter your email"
			});
		}
		if (!password) {
			return fail(400, {
				error: "Please enter your password",
				values: {
					email
				}
			});
		}

		const { error } = await locals.supabase.auth.signInWithPassword({ email, password });

		if (error) {
			if (error instanceof AuthApiError && error.status === 400) {
				return fail(400, {
					error: "Invalid credentials.",
					values: {
						email
					}
				});
			}
			return fail(500, {
				error: "Server error. Try again later.",
				values: {
					email
				}
			});
		}

		throw redirect(303, "/");
	}
};
