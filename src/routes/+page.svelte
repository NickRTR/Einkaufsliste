<script>
	import { wordList, products } from "$lib/stores";
	import { toast } from "@zerodevx/svelte-toast";
	import { flip } from "svelte/animate";
	import { fade, fly } from "svelte/transition";
	import { toggleChecked, editAmount, getProducts } from "$lib/api";
	import { page } from "$app/stores";

	import ProductCard from "$lib/components/ProductCard.svelte";

	let input = "";

	// Timer that checks when the user is done typing
	// to save resources by reducing the number of unnecessary search algorithm runs
	let timer;

	function startTimer() {
		clearTimeout(timer);
		timer = setTimeout(processInput, 250);
	}

	function stopTimer() {
		clearTimeout(timer);
	}

	$: processedProducts = $products;

	async function processInput() {
		if (input === "") {
			processedProducts = $products;
		} else {
			processedProducts = [];
			$products.forEach((product) => {
				const title = product.title.toLowerCase();
				const i = input.toLowerCase();
				if (title === i || title.startsWith(i)) {
					processedProducts = [...processedProducts, product];
				}
			});

			if (processedProducts.length === 0) {
				$products.forEach((product) => {
					const title = product.title.toLowerCase();
					const i = input.toLowerCase();
					if (title.includes(i)) {
						processedProducts = [...processedProducts, product];
					}
				});
			}
		}
	}

	async function addProduct() {
		// check if string is empty
		input = input.trim();
		if (input.length !== 0) {
			try {
				const productRes = await fetch(`/api/product/getProduct-${input}`);
				const productData = await productRes.json();

				if (productData.error) throw new Error(productData.error);

				if (productData.products.length !== 0) {
					const product = productData.products[0];
					if (product.title === input) {
						if (product.checked === true) {
							await toggleChecked(product.id, true);
							return;
						} else {
							if (confirm(`${product.title}: ${$wordList.index.productAlreadyListed}`)) {
								editAmount(product.id, product.amount, product.amount + 1);
								return;
							} else {
								return;
							}
						}
					}
				}

				const categoryRes = await fetch(`/api/product/getCategory-${input}`);
				const categoryData = await categoryRes.json();

				if (categoryData.error) throw new Error(categoryData.error);

				const sortRes = await fetch(`/api/product/getSort-${categoryData.category}`);
				const sortData = await sortRes.json();

				if (sortData.error) throw new Error(sortData.error);

				const res = await fetch(`/api/product/addProduct`, {
					method: "PUT",
					body: JSON.stringify({
						title: input,
						category: categoryData.category,
						sort: sortData.sort,
						id: $page.data.user.id
					})
				});
				const data = await res.json();

				if (data.error) throw new Error(data.error);
				input = "";
			} catch (error) {
				toast.push("An error ocurred while adding a new product: " + error.message);
			}
			await getProducts();
		}
	}
</script>

<svelte:head>
	<title>Schoppy</title>
</svelte:head>

<main>
	<form
		class="addProduct"
		on:submit|preventDefault={async () => {
			await addProduct(input);
			input = "";
		}}
	>
		<input type="text" autocomplete="off" on:keyup={startTimer} on:keydown={stopTimer} bind:value={input} title={$wordList.index.add} placeholder={$wordList.index.placeholder} />
		<button type="submit" title={$wordList.index.add}>{$wordList.index.add}</button>
	</form>

	<div class="products">
		{#each processedProducts as product (product.id)}
			<div animate:flip={{ duration: 1000 }} in:fade|local out:fly|local={{ x: 100 }}>
				{#if !product.checked}
					<ProductCard {product} />
				{/if}
			</div>
		{:else}
			<p>{$wordList.index.noFittingProducts}</p>
		{/each}
	</div>

	<div class="checkedProducts">
		<p class="divider"><span>{$wordList.index.checked}</span></p>
		{#each processedProducts as product (product.id)}
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
	}

	input {
		width: 55%;
		height: 2rem;
		padding: 0 0.5rem;
		font-size: 1.25rem;
		border-radius: 0.75rem;
		border: 3px solid var(--minor);
		background-color: var(--major);
		outline: none;
	}

	input:hover,
	input:focus {
		border-color: var(--accent);
	}

	input::placeholder {
		font-weight: normal;
	}

	form > button {
		font-size: 1.125rem;
		font-weight: bold;
		margin-left: 0.375rem;
		border-radius: 0.75rem;
		border: 3px solid var(--accent);
		outline: none;
	}

	form > button:focus,
	form > button:hover {
		border-color: var(--minor);
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
