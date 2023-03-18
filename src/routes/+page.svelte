<script lang="ts">
	import type { PageData } from "./$types";
	import type { Product } from "$lib/types/product.type";
	import { wordList, products } from "$lib/stores";
	import { flip } from "svelte/animate";
	import { fade, fly } from "svelte/transition";
	import toast from "svelte-french-toast";

	import ProductCard from "$lib/components/ProductCard.svelte";

	export let data: PageData;

	if (data.error) {
		toast.error(data.error);
	}

	async function addProduct(title: string) {}
</script>

<svelte:head>
	<title>Schoppy</title>
</svelte:head>

<main>
	<form
		class="addProduct"
		on:submit|preventDefault={async (event) => {
			await addProduct(event.target.innerHTML);
		}}
	>
		<input
			type="text"
			autocomplete="off"
			title={$wordList.index.add}
			placeholder={$wordList.index.placeholder}
		/>
		<button type="submit" title={$wordList.index.add}>{$wordList.index.add}</button>
	</form>

	<div class="products">
		{#each data.products as product (product.id)}
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
		{#each data.products as product (product.id)}
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
		border: 3px solid var(--minor);
	}

	input:hover,
	input:focus {
		border-color: var(--accent);
	}

	input::placeholder {
		font-weight: normal;
	}

	form > button {
		font-weight: bold;
		margin-left: 0.375rem;
		border-radius: 0.75rem;
		border: 3px solid var(--accent);
		outline: none;
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
