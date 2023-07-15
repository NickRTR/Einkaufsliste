import supabase from "$lib/supabase";

export async function load({ cookies }) {
	const accessToken = cookies.get("access_token");
	const refreshToken = cookies.get("refresh_token");
	if (accessToken) {
		const { user, error } = await supabase.auth.api.getUser(accessToken);

		if (error) {
			return {};
		}

		return {
			user: {
				email: user.email,
				id: user.id
			}
		};
	} else if (refreshToken) {
		const response = await supabase.auth.signIn({ refreshToken: refreshToken });

		if (!response.error) {
			cookies.set("access_token", response.session.access_token, {
				path: "/",
				httpOnly: true,
				sameSite: "strict",
				secure: process.env.NODE_ENV === "production",
				maxAge: 60 * 60 * 24 * 12
			});

			cookies.set("refresh_token", response.session.refresh_token, {
				path: "/",
				httpOnly: true,
				sameSite: "strict",
				secure: process.env.NODE_ENV === "production"
			});

			return {
				user: {
					email: response.user.email,
					id: response.user.id
				}
			};
		}
	}
}
