import { toast } from "svelte-french-toast";
import type { Product } from "$lib/types/product.type";

export async function toggleChecked(supabase, product: Product) {
	const { error } = await supabase
		.from("products")
		.update({ checked: product.checked === false })
		.eq("id", product.id);
	if (error) {
		toast.error("An error ocurred while toggling the product's state: " + error.message);
	}
}

export async function editAmount(supabase, product: Product, amount: number) {
	if (amount === product.amount) return;
	let amountS = amount.toString();
	amountS = amountS.replace(",", ".");
	if (amountS.trim().length === 0) return;

	const { error } = await supabase.from("products").update({ amount }).eq("id", product.id);
	if (error) {
		toast.error("An error ocurred while editing the product's quantity amount: " + error.message);
	}
}

export async function getCategory(supabase, title) {
	title = title.toLowerCase();

	let { data: categories, error } = await supabase.from("userdata").select("categories");
	if (error) {
		toast.error("An error ocurred while retrieving the product's category: " + error.message);
	} else {
		let { data: priorities, error } = await supabase.from("userdata").select("priorities");
		if (error) {
			toast.error("An error ocurred while retrieving the product's category: " + error.message);
		} else {
			categories = categories[0].categories;
			priorities = priorities[0].priorities;

			// first, check if there's an explicit fit
			for (let i = 0; i < priorities.length; i++) {
				if (categories[priorities[i]].includes(title)) {
					let category = priorities[i];
					return category;
				}
			}

			// then check if there's an other not perfect fitting entry
			for (let i = 0; i < priorities.length; i++) {
				for (let y = 0; y < categories[priorities[i]].length; y++) {
					let product = categories[priorities[i]];
					if (product[y].includes(title) || title.includes(product[y])) {
						let category = priorities[i];
						return category;
					}
				}
			}
		}
	}

	return "choose";
}

export async function getSort(supabase, category: string) {
	if (category === "choose") {
		return 0;
	}

	let { data: priorities, error } = await supabase.from("userdata").select("priorities");
	if (error) {
		toast.error("An error ocurred while retrieving the product's sort: " + error.message);
	}

	priorities = priorities[0].priorities;

	for (let i = 0; i <= Object.keys(priorities).length; i++) {
		if (priorities[i] === category) {
			return i + 1;
		}
	}

	toast.error("Invalid category");
}
