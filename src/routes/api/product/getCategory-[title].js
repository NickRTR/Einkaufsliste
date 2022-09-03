export async function GET({ params, locals }) {
	let { title } = params;
	title = title.toLowerCase();

	const categories = locals.user.userdata.categories;
	const priorities = locals.user.userdata.priorities;

	// first, check if there's an explicit fit
	for (let i = 0; i < priorities.length; i++) {
		if (categories[priorities[i]].includes(title)) {
			let category = priorities[i];
			return {
				status: 200,
				body: {
					category
				}
			};
		}
	}

	// then check if there's an other not perfect fitting entry
	for (let i = 0; i < priorities.length; i++) {
		for (let y = 0; y < categories[priorities[i]].length; y++) {
			let product = categories[priorities[i]];
			if (product[y].includes(title) || title.includes(product[y])) {
				let category = priorities[i];
				return {
					status: 200,
					body: {
						category
					}
				};
			}
		}
	}

	return {
		status: 200,
		body: {
			category: "choose"
		}
	};
}
