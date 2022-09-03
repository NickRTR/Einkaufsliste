export async function GET({ locals }) {
	return {
		status: 200,
		body: {
			categories: locals.user.userdata.priorities
		}
	};
}
