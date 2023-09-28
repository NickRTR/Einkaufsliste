import { AuthApiError } from "@supabase/supabase-js";
import { fail } from "@sveltejs/kit";

export const actions = {
	default: async ({ request, locals, url }) => {
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
				error: "Please enter a password",
				values: {
					email
				}
			});
		}

		const { error } = await locals.supabase.auth.signUp({
			email,
			password,
			options: { emailRedirectTo: url.origin }
		});

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
				error: "Server error: " + error.message,
				values: {
					email
				}
			});
		}

		return {
			message: "Please check your emails for a magic link to log into the website."
		};
	}
};
