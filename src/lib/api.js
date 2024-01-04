import toast from "svelte-french-toast";
import { supabase } from "$lib/supabase";

export async function getProducts(uuid) {
	const { data, error } = await supabase.from("products").select().eq("uuid", uuid).order("sort");
	if (error) toast.error(error.message);
	return data;
}

export async function editTitle(id, oldTitle, newTitle) {
	newTitle = newTitle.trim();
	if (oldTitle === newTitle) return;

	const { error } = await supabase.from("products").update({ title: newTitle }).eq("id", id);
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

export async function changeCategory(id, userId, oldCategory, newCategory) {
	if (oldCategory === newCategory) return;

	const { error, data } = await supabase.from("userdata").select("priorities").eq("uuid", userId);
	if (!error) {
		const sort = data[0].priorities.indexOf(newCategory);
		const { error } = await supabase
			.from("products")
			.update({ category: newCategory, sort })
			.eq("id", id);
		if (error) toast.error(error.message);
	} else {
		toast.error(error.message);
	}
}
