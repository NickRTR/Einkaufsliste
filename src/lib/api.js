import toast from "svelte-french-toast";
import { _ } from "svelte-i18n";
import { supabase } from "$lib/supabase";
import { page } from "$app/stores";
import { get } from "svelte/store";

export async function getProducts(uuid) {
	const { data: products, error } = await supabase
		.from("products_duplicate")
		.select(`*, categories(category, sort)`)
		.eq("uuid", uuid);
	const sortedProducts = products.sort((a, b) => a.categories.sort - b.categories.sort);
	if (error) toast.error(error.message);
	return sortedProducts;
}

export async function editTitle(id, oldTitle, newTitle) {
	newTitle = newTitle.trim();
	if (oldTitle === newTitle || newTitle.length <= 1) newTitle = oldTitle;

	const category = await getCategory(newTitle);

	const { error } = await supabase
		.from("products_duplicate")
		.update({ title: newTitle, category })
		.eq("id", id);
	if (error) toast.error(error).message;
}

export async function editAmount(id, oldAmount, newAmount) {
	if (oldAmount === newAmount) return;

	const { error } = await supabase
		.from("products_duplicate")
		.update({ amount: newAmount })
		.eq("id", id);
	if (error) toast.error(error.message);
}

export async function editUnit(id, oldUnit, newUnit) {
	if (oldUnit === newUnit) return;

	const { error } = await supabase
		.from("products_duplicate")
		.update({ unit: newUnit })
		.eq("id", id);
	if (error) toast.error(error.message);
}

export async function toggleChecked(id, checked) {
	const { error } = await supabase
		.from("products_duplicate")
		.update({ checked: !checked })
		.eq("id", id);
	if (error) toast.error(error.message);
}

export async function deleteProduct(id) {
	if (confirm(get(_)("pages.home.deleteConfirm"))) {
		const { error } = await supabase.from("products_duplicate").delete().eq("id", id);
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

	const { error } = await supabase
		.from("products_duplicate")
		.update({ category: newCategory })
		.eq("id", id);
	if (error) toast.error(error.message);
}

export async function updatePriorities(priorities, uuid) {
	for (let i = 0; i < priorities.length; i++) {
		const { error } = await supabase
			.from("categories")
			.update({ sort: i + 1 })
			.eq("category", priorities[i])
			.eq("uuid", uuid);
		if (error) toast.error(error.message);
	}
}
