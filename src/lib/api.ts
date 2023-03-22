import { toast } from "svelte-french-toast";
import type { Product } from "$lib/types/product.type";
import { products } from "$lib/stores";
import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "./types/database";

export async function getProducts(supabase: SupabaseClient<Database>) {
	const { data, error } = await supabase
		.from("products")
		.select("*")
		.order("sort", { ascending: true });
	if (error) {
		toast.error("An error occurred while fetching the products: " + error.message);
	} else {
		products.set(data);
	}
}

export async function toggleChecked(supabase: SupabaseClient<Database>, product: Product) {
	const { error } = await supabase
		.from("products")
		.update({ checked: product.checked === false })
		.eq("id", product.id);
	if (error) {
		toast.error("An error ocurred while toggling the product's state: " + error.message);
	} else {
		await getProducts(supabase);
	}
}

export async function editAmount(
	supabase: SupabaseClient<Database>,
	product: Product,
	amount: number
) {
	if (amount === product.amount) return;
	let amountS = amount.toString();
	amountS = amountS.replace(",", ".");

	if (amountS.trim().length === 0) return;

	const { error } = await supabase
		.from("products")
		.update({ amount: amountS })
		.eq("id", product.id);
	if (error) {
		toast.error("An error ocurred while editing the product's quantity amount: " + error.message);
	} else {
		await getProducts(supabase);
	}
}

export async function getCategory(supabase: SupabaseClient<Database>, title: string) {
	title = title.toLowerCase();

	const { data: categoriesData, error } = await supabase.from("userdata").select("categories");
	if (error) {
		toast.error("An error ocurred while retrieving the product's category: " + error.message);
	} else {
		const { data: prioritiesData, error } = await supabase.from("userdata").select("priorities");
		if (error) {
			toast.error("An error ocurred while retrieving the product's category: " + error.message);
		} else {
			const categories = categoriesData[0].categories;
			const priorities = prioritiesData[0].priorities;

			// first, check if there's an explicit fit
			for (let i = 0; i < priorities.length; i++) {
				if (categories[priorities[i]].includes(title)) {
					const category = priorities[i];
					return category;
				}
			}

			// then check if there's an other not perfect fitting entry
			for (let i = 0; i < priorities.length; i++) {
				for (let y = 0; y < categories[priorities[i]].length; y++) {
					const product = categories[priorities[i]];
					if (product[y].includes(title) || title.includes(product[y])) {
						const category = priorities[i];
						return category;
					}
				}
			}
		}
	}

	return "choose";
}

export async function getSort(supabase: SupabaseClient<Database>, category: string) {
	if (category === "choose") {
		return 0;
	}

	const { data: prioritiesData, error } = await supabase.from("userdata").select("priorities");
	if (error) {
		toast.error("An error ocurred while retrieving the product's sort: " + error.message);
	}

	const priorities = prioritiesData[0].priorities;

	for (let i = 0; i <= Object.keys(priorities).length; i++) {
		if (priorities[i] === category) {
			return i + 1;
		}
	}

	toast.error("Invalid category");
}
