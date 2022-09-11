import { redirect } from "@sveltejs/kit";

export async function load({ parent, fetch }) {
	const { user } = await parent();
	if (!user) {
		throw redirect(302, "/auth/login");
	}

	const res = await fetch("/api/userdata/getPriorities");
	const data = await res.json();

	if (data.error) throw new Error(data.error);

	return {
		priorities: data.priorities
	};
}
