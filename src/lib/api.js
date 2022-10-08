export async function send(form) {
	const res = await fetch(form.action, {
		method: form.method,
		body: new FormData(form),
		headers: { accept: "application/json" }
	});
	return await res.json();
}

import { products } from "$lib/stores";
import { toast } from "@zerodevx/svelte-toast";
import { wordList } from "$lib/stores";
import { get } from "svelte/store";
import { page } from "$app/stores";

export async function getProducts(specialFetch) {
	let res;

	if (specialFetch) {
		res = await specialFetch("/api/product/getProducts");
	} else {
		res = await fetch("/api/product/getProducts");
	}

	const data = await res.json();

	if (data.error) {
		toast.push("An error occurred while fetching products: " + data.error);
	} else if (data.products) {
		products.set(data.products);
	}
}

export async function toggleChecked(id, checked) {
	try {
		const res = await fetch("/api/product/toggleChecked", {
			method: "PATCH",
			body: JSON.stringify({
				id,
				checked
			})
		});
		const data = await res.json();

		if (data.error) throw new Error(data.error);

		await getProducts();
	} catch (error) {
		toast.push("An error ocurred while toggling the product's state: " + error.message);
	}
}

export async function deleteProduct(id) {
	if (confirm(get(wordList).index.deleteMessage)) {
		try {
			const res = await fetch("/api/product/deleteProduct", {
				method: "DELETE",
				body: JSON.stringify({
					id
				})
			});
			const data = await res.json();

			if (data.error) throw new Error(data.error);

			await getProducts();
		} catch (error) {
			toast.push("An error ocurred while deleting the product: " + error.message);
		}
	}
}

export async function editTitle(id, oldTitle, title) {
	try {
		if (title === oldTitle || title.trim().length === 0) return;

		const categoryRes = await fetch(`/api/product/getCategory-${title}`);
		const categoryData = await categoryRes.json();
		if (categoryData.error) throw new Error(categoryData.error);

		const sortRes = await fetch(`/api/product/getSort-${categoryData.category}`);
		const sortData = await sortRes.json();
		if (sortData.error) throw new Error(sortData.error);

		const res = await fetch("/api/product/editTitle", {
			method: "PATCH",
			body: JSON.stringify({
				id,
				title,
				category: categoryData.category,
				sort: sortData.sort
			})
		});
		const data = await res.json();
		if (data.error) throw new Error(data.error);

		await getProducts();
	} catch (error) {
		toast.push("An error occurred while editing the product's title: " + error.message);
	}
}

export async function editAmount(id, oldAmount, amount) {
	try {
		if (amount === oldAmount) return;
		amount = amount.toString();
		if (amount.trim().length === 0) return;

		const res = await fetch("/api/product/updateAmount", {
			method: "PATCH",
			body: JSON.stringify({
				id,
				amount
			})
		});
		const data = await res.json();

		if (data.error) throw new Error(data.error);
	} catch (error) {
		toast.push("An error ocurred while editing the product's quantity amount: " + error.message);
	}
	await getProducts();
}

export async function editType(id, type) {
	try {
		const res = await fetch("/api/product/editType", {
			method: "PATCH",
			body: JSON.stringify({
				id,
				type
			})
		});
		const data = await res.json();

		if (data.error) throw new Error(data.error);
	} catch (error) {
		toast.push("An error ocurred while editing the product's quantity type: " + error.message);
	}
}

export async function changeCategory(id, oldCategory, category, title) {
	try {
		const categoriesRes = await fetch("/api/userdata/getCategories");
		const categoriesData = await categoriesRes.json();

		if (categoriesData.error) throw new Error(categoriesData.error);

		let categories = categoriesData.categories;

		if (oldCategory !== "choose") {
			categories[oldCategory] = categories[oldCategory].filter((value) => value != title.toLowerCase());
		}
		categories[category] = [title.toLowerCase(), ...categories[category]];
		const updateRes = await fetch("/api/userdata/updateCategories", {
			method: "POST",
			body: JSON.stringify({
				categories,
				id: get(page).data.user.id
			})
		});

		const updateData = await updateRes.json();

		if (updateData.error) throw new Error(updateData.error);

		const sortRes = await fetch(`/api/product/getSort-${category}`);
		const sortData = await sortRes.json();

		if (sortData.error) throw new Error(sortData.error);

		const res = await fetch("/api/product/updateCategory", {
			method: "PATCH",
			body: JSON.stringify({
				id,
				category,
				sort: sortData.sort
			})
		});
		const data = await res.json();

		if (data.error) throw new Error(data.error);

		await getProducts();
	} catch (error) {
		console.log(error);
		toast.push("An error occurred while changing the product's category: " + error.message);
	}
}
