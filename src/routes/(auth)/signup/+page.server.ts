import { AuthApiError } from "@supabase/supabase-js";
import { fail, type ActionFailure } from "@sveltejs/kit";
import { wordList } from "$lib/stores";
import { get } from "svelte/store";

export const actions = {
	async default({
		request,
		url,
		locals: { supabase }
	}): Promise<ActionFailure<{ error: string; values?: { email: string } }> | { message: string }> {
		const formData = await request.formData();

		const email = formData.get("email") as string;
		const password = formData.get("password") as string;

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

		const { data, error } = await supabase.auth.signUp({
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
				error: "Server error. Try again later.",
				values: {
					email
				}
			});
		}

		const { error: err } = await supabase.from("userdata").insert([{ uuid: data.user.id }]);
		if (err) {
			return fail(500, {
				error: err.message
			});
		}

		return {
			message: get(wordList).login.verification
		};
	}
};
