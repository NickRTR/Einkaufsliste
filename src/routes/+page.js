import { redirect } from "@sveltejs/kit";
import { getProducts } from "$lib/api";

export async function load({ parent, fetch }) {
	const { user } = await parent();
	if (!user) {
		throw redirect(302, "/auth/login");
	}

	await getProducts(fetch);
}
