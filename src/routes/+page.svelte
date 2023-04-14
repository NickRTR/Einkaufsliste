<script lang="ts">
	import { wordList, products } from "$lib/stores";
	import { toggleChecked, editAmount, getCategory, getSort, getProducts } from "$lib/api";
	import { flip } from "svelte/animate";
	import { fade, fly } from "svelte/transition";
	import { page } from "$app/stores";
	import toast from "svelte-french-toast";

	import ProductCard from "$lib/components/ProductCard.svelte";

	export let data;
	products.set(data.products!);

	let input = "";

	if (data.error) {
		toast.error(data.error);
	}

	async function addProduct() {
		// check if string is empty
		const title = input.trim();
		if (title.length !== 0) {
			if ($products.length !== 0) {
				const { data: matchingProducts, error } = await data
					.supabase!.from("products")
					.select("*")
					.eq("title", title);
				if (error) {
					toast.error("Could not create product: " + error.message);
					return;
				} else if (matchingProducts.length > 0) {
					const product = matchingProducts[0];
					if (product.checked === true) {
						await toggleChecked(data.supabase!, product);
						return;
					} else {
						if (confirm(`${product.title}: ${$wordList.index.productAlreadyListed}`)) {
							editAmount(data.supabase!, product, product.amount + 1);
							input = "";
							return;
						} else {
							return;
						}
					}
				}
			}
		}

		const category = await getCategory(data.supabase!, title);

		const sort = await getSort(data.supabase!, category);

		const { error } = await data
			.supabase!.from("products")
			.insert([{ title, category, sort, uuid: $page.data.user.id }]);
		if (error) {
			toast.error("Error while adding the product: " + error.message);
		} else {
			await getProducts(data.supabase!);
		}
		input = "";
	}
</script>

<svelte:head>
	<title>Schoppy</title>
</svelte:head>

<main>
	<form
		class="addProduct"
		on:submit|preventDefault={async () => {
			await addProduct();
		}}
	>
		<input
			bind:value={input}
			type="text"
			autocomplete="off"
			title={$wordList.index.add}
			placeholder={$wordList.index.placeholder}
		/>
		<button type="submit" title={$wordList.index.add}>{$wordList.index.add}</button>
	</form>

	<div class="products">
		{#each $products as product (product.id)}
			<div animate:flip={{ duration: 1000 }} in:fade|local out:fly|local={{ x: 100 }}>
				{#if !product.checked}
					<ProductCard {product} />
				{/if}
			</div>
		{:else}
			<p>{$wordList.index.noFittingProducts}</p>
		{/each}
	</div>

	<p class="divider"><span>{$wordList.index.checked}</span></p>

	<div class="checkedProducts">
		{#each $products as product (product.id)}
			<div in:fade|local out:fly|local={{ x: 100 }}>
				{#if product.checked}
					<ProductCard {product} />
				{/if}
			</div>
		{/each}
	</div>
</main>

<style>
	.addProduct {
		display: flex;
		margin-bottom: 0.5rem;
		justify-content: center;
		align-items: center;
	}

	input {
		width: 55%;
		margin-right: 0.5rem;
	}

	.divider {
		text-align: center;
		border-bottom: 5px solid var(--accent);
		border-top: 5px solid var(--accent);
		border-radius: 0.5rem;
		line-height: 0;
		margin: 1rem 0.7rem;
	}

	.divider span {
		background-color: var(--major);
		padding: 0 7px;
	}

	.checkedProducts div {
		filter: opacity(80%);
	}

	/* Scroll Bar */

	/* width */
	::-webkit-scrollbar {
		width: 15px;
		margin-right: 2.5rem;
	}

	/* Track */
	::-webkit-scrollbar-track {
		box-shadow: inset 0 0 5px grey;
		border-radius: 7px;
	}

	/* Handle */
	::-webkit-scrollbar-thumb {
		background: var(--primary);
		border-radius: 7px;
	}
</style>
