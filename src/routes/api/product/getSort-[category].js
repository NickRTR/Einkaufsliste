export async function GET({ params, locals }) {
	let { category } = params;

	const priorities = locals.user.userdata.priorities;

	if (category === "choose") {
		return {
			status: 200,
			body: {
				sort: 0
			}
		};
	}

	for (let i = 0; i <= Object.keys(priorities).length; i++) {
		if (priorities[i] === category) {
			return {
				status: 200,
				body: {
					sort: i + 1
				}
			};
		}
	}

	return {
		status: 500,
		body: {
			error: "Invalid category"
		}
	};
}
