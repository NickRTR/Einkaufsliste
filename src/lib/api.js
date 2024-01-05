import toast from "svelte-french-toast";
import { supabase } from "$lib/supabase";
import { page } from "$app/stores";
import { get } from "svelte/store";

export async function getProducts(uuid) {
	const { data, error } = await supabase.from("products").select().eq("uuid", uuid).order("sort");
	if (error) toast.error(error.message);
	return data;
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

export async function toggleChecked(id, checked) {
	const { error } = await supabase.from("products").update({ checked: !checked }).eq("id", id);
	if (error) toast.error(error.message);
}

export async function deleteProduct(id) {
	const { error } = await supabase.from("products").delete().eq("id", id);
	if (error) toast.error(error.message);
	else toast.success("Deleted product");
}

export async function getCategory(title) {
	title = title.trim().toLowerCase();

	const { data, error } = await supabase
		.from("user_categories")
		.select()
		.eq("title", title)
		.eq("uuid", get(page).data.session.user.id);
	if (error) {
		toast.error(error.message);
	} else if (data.length > 0) {
		return data[0].category;
	} else {
		const language = localStorage.getItem("lang");
		const { data, error } = await supabase
			.from("categories")
			.select()
			.eq("title", title)
			.eq("language", language);
		if (error) toast.error(error.message);
		if (data.length === 0) {
			return "choose";
		}
		return data[0].category;
	}
}

async function getPriority(userId, category) {
	const { error, data } = await supabase.from("userdata").select("priorities").eq("uuid", userId);
	const sort = data[0].priorities.indexOf(category);
	if (error) toast.error(error.message);
	else return sort;
}

export async function changeCategory(id, userId, title, oldCategory, newCategory) {
	if (oldCategory === newCategory) return;

	const { count } = await supabase
		.from("user_categories")
		.select("*", { count: "exact", head: true })
		.eq("title", title)
		.eq("uuid", userId);

	if (count === 0) {
		const { error } = await supabase
			.from("user_categories")
			.insert([{ uuid: userId, title: title.trim().toLowerCase(), category: newCategory }]);
		if (error) toast.error(error.message);
	} else {
		const { error } = await supabase
			.from("user_categories")
			.update({ category: newCategory })
			.eq("uuid", userId)
			.eq("title", title);
		if (error) toast.error(error.message);
	}

	const sort = await getPriority(userId, newCategory);
	const { error } = await supabase
		.from("products")
		.update({ category: newCategory, sort })
		.eq("id", id);
	if (error) toast.error(error.message);
}
