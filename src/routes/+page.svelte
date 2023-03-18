<script lang="ts">
	import type { PageData } from "./$types";
	import type { Product } from "$lib/types/product.type";
	import { wordList, products } from "$lib/stores";
	import { flip } from "svelte/animate";
	import { fade, fly } from "svelte/transition";
	// import { toggleChecked, editAmount, getProducts } from "$lib/api";
	import { page } from "$app/stores";
	import toast from "svelte-french-toast";

	import ProductCard from "$lib/components/ProductCard.svelte";

	export let data: PageData;

	if (data.error) {
		toast.error(data.error);
	}

	let processedProducts: Product[] = [];

	$: {
		processedProducts = data.products;
	}

	$: console.log(data);
</script>

<svelte:head>
	<title>Schoppy</title>
</svelte:head>

<main>
	<!-- <form
		class="addProduct"
		on:submit|preventDefault={async () => {
			await addProduct(input);
			input = "";
		}}
	>
		<input
			type="text"
			autocomplete="off"
			on:keyup={startTimer}
			on:keydown={stopTimer}
			bind:value={input}
			title={$wordList.index.add}
			placeholder={$wordList.index.placeholder}
		/>
		<button type="submit" title={$wordList.index.add}>{$wordList.index.add}</button>
	</form> -->

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
