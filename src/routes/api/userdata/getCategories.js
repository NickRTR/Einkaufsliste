export async function GET({ locals }) {
	console.log(locals.user.userdata.categories);

	return {
		status: 200,
		body: {
			categories: locals.user.userdata.categories
		}
	};
}
