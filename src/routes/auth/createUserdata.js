import supabase from "$lib/supabase";
import { categories } from "$lib/categories";

export async function POST({ request }) {
	const { id } = await request.json();
	const { data, error } = await supabase.auth.api.updateUserById(id, {
		user_metadata: {
			categories,
			priorities: ["fruits", "vegetables", "pantry", "meat", "frozen", "cooled", "household", "sweets", "beverage"]
		}
	});

	if (error) {
		return {
			status: error.status,
			body: {
				error: error.message
			}
		};
	}

	return {
		status: 200,
		body: {
			user: data
		}
	};
}
