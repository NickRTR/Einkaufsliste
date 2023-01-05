import supabase from "$lib/supabase";
import { fail } from "@sveltejs/kit";

export const actions = {
	default: async ({ request, cookies }) => {
		const form = await request.formData();
		const email = form.get("email");
		const password = form.get("password");

		if (typeof email !== "string" || typeof password !== "string" || !email || !password) {
			return fail(403, { error: "Enter a valid email and password." });
		}

		const response = await supabase.auth.signIn({ email, password });

		if (response.error) {
			return fail(403, { error: response.error.message });
		}

		cookies.set("access_token", response.session.access_token, {
			path: "/",
			// server side only cookie so you can"t use `document.cookie`
			httpOnly: true,
			// only requests from same site can send cookies
			// and serves to protect from CSRF
			// https://developer.mozilla.org/en-US/docs/Glossary/CSRF
			sameSite: "strict",
			// only sent over HTTPS
			secure: process.env.NODE_ENV === "production",
			// set cookie to expire after two weeks
			maxAge: 60 * 60 * 24 * 12
		});

		cookies.set("refresh_token", response.session.refresh_token, {
			path: "/",
			httpOnly: true,
			sameSite: "strict",
			secure: process.env.NODE_ENV === "production"
		});
	}
};
