<script>
	import { flip } from "svelte/animate";
	import { fade, fly } from "svelte/transition";
	import { onMount } from "svelte";
	import { supabase } from "$lib/supabase";
	import { getProducts } from "$lib/api";

	import ProductCard from "$lib/components/ProductCard.svelte";

	export let data;

	let products = [];

	onMount(() => {
		products = data.products;
		console.log(products);
	});

	supabase
		.channel("custom-all-channel")
		.on("postgres_changes", { event: "*", schema: "public", table: "products" }, async () => {
			products = await getProducts(data.session.user.id);
		})
		.subscribe();

	let input = "";

	async function addProduct() {
		if (input.trim() === "") return;
		console.log(input);
		await supabase.from("products").insert([{ title: input, uuid: data.session.user.id }]);
		input = "";
	}
</script>

<body>
	<form>
		<input type="text" bind:value={input} />
		<button type="submit" on:click={addProduct}>Hinzufügen</button>
	</form>

	<div class="products">
		{#each products as product (product.id)}
			<div animate:flip={{ duration: 1000 }} in:fade|local out:fly|local={{ x: 100 }}>
				{#if !product.checked}
					<ProductCard {product} />
				{/if}
			</div>
		{/each}
	</div>

	<div class="checkedProducts">
		<p class="divider"><span>checked</span></p>
		{#each products as product (product.id)}
			<div in:fade|local out:fly|local={{ x: 100 }}>
				{#if product.checked}
					<ProductCard {product} />
				{/if}
			</div>
		{/each}
	</div>
</body>

<style>
	form {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 0.5rem;
	}

	input {
		width: 55%;
		padding: 0.25rem 0.5rem;
		font-size: 1.25rem;
		border-radius: 0.75rem;
		border: 3px solid var(--text);
		background-color: var(--background);
		outline: none;
	}

	input:hover,
	input:focus {
		border-color: var(--accent);
	}

	input::placeholder {
		font-weight: normal;
	}

	button {
		height: 2.2rem;
	}
</style>
