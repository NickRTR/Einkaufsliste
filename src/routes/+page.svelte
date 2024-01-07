<script>
	import { flip } from "svelte/animate";
	import { fade, fly } from "svelte/transition";
	import { onMount } from "svelte";
	import { supabase } from "$lib/supabase";
	import { getProducts } from "$lib/api";
	import { toast } from "svelte-french-toast";
	import { getCategory } from "$lib/api";
	import { _ } from "svelte-i18n";

	import ProductCard from "$lib/components/ProductCard.svelte";
	import autoselect from "svelte-autoselect";

	export let data;

	let products = [];

	onMount(() => {
		products = data.products;
	});

	supabase
		.channel("custom-all-channel")
		.on("postgres_changes", { event: "*", schema: "public", table: "products" }, async () => {
			products = await getProducts(data.session.user.id);
		})
		.subscribe();

	let input = "";

	async function addProduct() {
		input = input.trim();
		if (input === "") return;

		for (let product of products) {
			if (product.title === input) {
				if (product.checked) {
					await supabase
						.from("products")
						.update({ checked: false, amount: 1, unit: "stk" })
						.eq("id", product.id);
				}
				input = "";
				products = await getProducts(data.session.user.id);
				return;
			}
		}

		const category = await getCategory(input);

		await supabase
			.from("products")
			.insert([{ title: input, uuid: data.session.user.id, category }]);
		input = "";
	}

	async function search() {
		const { data: res, error } = await supabase
			.from("products")
			.select()
			.eq("uuid", data.session.user.id)
			.ilike("title", "%" + input + "%");
		if (error) toast.error(error.message);
		else products = res;
	}
</script>

<body>
	<form>
		<input type="text" bind:value={input} on:input={search} use:autoselect />
		<button type="submit" on:click={addProduct}>{$_("pages.home.add")}</button>
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
		<p class="divider"><span>{$_("pages.home.divider")}</span></p>
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

	.divider {
		text-align: center;
		border-bottom: 5px solid var(--accent);
		border-top: 5px solid var(--accent);
		border-radius: 0.5rem;
		line-height: 0;
		margin: 1rem 0.7rem;
	}

	.divider span {
		background-color: var(--background);
		padding: 0 7px;
	}

	.checkedProducts div {
		filter: opacity(80%);
	}
</style>
