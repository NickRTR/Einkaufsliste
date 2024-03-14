import toast from "svelte-french-toast";
import { _ } from "svelte-i18n";
import { supabase } from "$lib/supabase";
import { page } from "$app/stores";
import { get } from "svelte/store";

const categoryList = {
	choose: 0,
	cooled: 1,
	meat: 2,
	frozen: 3,
	fruits: 4,
	vegetables: 5,
	pantry: 6,
	beverages: 7,
	household: 8,
	sweets: 9
};

export async function getProducts(uuid) {
	const { data: products, error } = await supabase
		.from("products")
		.select(`*, categories(category)`)
		.eq("uuid", uuid);
	if (error) toast.error(error.message);
	return sortProducts(products, uuid);
}

export async function sortProducts(products, uuid) {
	let { data: priorities, error } = await supabase
		.from("userdata")
		.select(`priorities_2`)
		.eq("uuid", uuid);
	if (error) return products;
	priorities = priorities[0].priorities_2;
	return products.sort((a, b) => priorities[a.category] - priorities[b.category]);
}

export async function sortCategories(categories, uuid) {
	let { data: priorities, error } = await supabase
		.from("userdata")
		.select(`priorities_2`)
		.eq("uuid", uuid);
	if (error) return products;
	priorities = priorities[0].priorities_2;

	// Convert categories array to an object
	const categoriesObj = categories.reduce((obj, item) => {
		obj[item.id] = item.category;
		return obj;
	}, {});

	const sortedCategories = Object.keys(categoriesObj)
		.sort((a, b) => priorities[a] - priorities[b])
		.map((key) => categoriesObj[key]);

	return sortedCategories;
}

export async function editTitle(id, oldTitle, newTitle) {
	newTitle = newTitle.trim();
	if (oldTitle === newTitle || newTitle.length <= 1) newTitle = oldTitle;

	const category = await getCategory(newTitle);

	const { error } = await supabase
		.from("products")
		.update({ title: newTitle, category })
		.eq("id", id);
	if (error) toast.error(error).message;
}

export async function editAmount(id, oldAmount, newAmount) {
	if (oldAmount === newAmount) return;

	const { error } = await supabase.from("products").update({ amount: newAmount }).eq("id", id);
	if (error) toast.error(error.message);
}

export async function editUnit(id, oldUnit, newUnit) {
	if (oldUnit === newUnit) return;

	const { error } = await supabase.from("products").update({ unit: newUnit }).eq("id", id);
	if (error) toast.error(error.message);
}

export async function toggleChecked(id, checked) {
	const { error } = await supabase.from("products").update({ checked: !checked }).eq("id", id);
	if (error) toast.error(error.message);
}

export async function deleteProduct(id) {
	if (confirm(get(_)("pages.home.deleteConfirm"))) {
		const { error } = await supabase.from("products").delete().eq("id", id);
		if (error) toast.error(error.message);
		else toast.success(get(_)("pages.home.deleteSuccess"));
	}
}

export async function getCategory(title) {
	title = title.trim().toLowerCase();

	const { data, error } = await supabase
		.from("user_dictionary")
		.select()
		.eq("title", title)
		.eq("uuid", get(page).data.session.user.id);
	if (error) {
		toast.error(error.message);
	} else if (data.length > 0) {
		return data[0].category;
	} else {
		const language = localStorage.getItem("lang");
		const { data, error } = await supabase.from("dictionary").select().eq("language", language);

		if (error) {
			toast.error(error.message);
		} else {
			const matchingTitle = data.find((dbTitle) => title.includes(dbTitle.title));
			if (matchingTitle) {
				return matchingTitle.category;
			}
			return 0;
		}
	}
}

export async function changeCategory(id, userId, title, oldCategory, newCategory) {
	if (oldCategory === newCategory) return;

	newCategory = categoryList[newCategory];

	const { count } = await supabase
		.from("user_dictionary")
		.select("*", { count: "exact", head: true })
		.eq("title", title)
		.eq("uuid", userId);

	if (count === 0) {
		const { error } = await supabase
			.from("user_dictionary")
			.insert([{ uuid: userId, title: title.trim().toLowerCase(), category: newCategory }]);
		if (error) toast.error(error.message);
	} else {
		const { error } = await supabase
			.from("user_dictionary")
			.update({ category: newCategory })
			.eq("uuid", userId)
			.eq("title", title);
		if (error) toast.error(error.message);
	}

	const { error } = await supabase.from("products").update({ category: newCategory }).eq("id", id);
	if (error) toast.error(error.message);
}

export async function updatePriorities(priorities, uuid) {
	const p = { 1: 1, 2: 2, 3: 3, 4: 4, 5: 5, 6: 6, 7: 7, 8: 8, 9: 9 };
	for (let i = 0; i < priorities.length; i++) {
		if (priorities[i] === "choose") continue;
		const category = categoryList[priorities[i]];
		p[category] = i;
	}
	const { error } = await supabase.from("userdata").update({ priorities_2: p }).eq("uuid", uuid);
	if (error) toast.error(error.message);
	toast.success(get(_)("pages.settings.categories.prioritiesUpdated"));
}
