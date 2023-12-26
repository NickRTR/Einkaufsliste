import toast from "svelte-french-toast";
import { supabase } from "$lib/supabase";

export async function getProducts(uuid) {
	const { data, error } = await supabase.from("products").select().eq("uuid", uuid);
	if (error) toast.error(error);
	return data;
}

export async function editTitle(id, oldTitle, newTitle) {
	newTitle = newTitle.trim();

	if (oldTitle === newTitle) return;

	const { error } = await supabase.from("products").update({ title: newTitle }).eq("id", id);
	if (error) toast.error(error);
}

export async function editAmount(id, oldAmount, newAmount) {
	if (oldAmount === newAmount) return;

	const { error } = await supabase.from("products").update({ amount: newAmount }).eq("id", id);
	if (error) toast.error(error);
}

export async function toggleChecked(id, checked) {
	const { error } = await supabase.from("products").update({ checked: !checked }).eq("id", id);
	if (error) toast.error(error);
}

export async function deleteProduct(id) {
	const { error } = await supabase.from("products").delete().eq("id", id);
	if (error) toast.error(error);
	else toast.success("Deleted product");
}
