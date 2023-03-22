<script lang="ts">
	import type { Product } from "$lib/types/product.type";
	import { slide } from "svelte/transition";
	import { wordList } from "$lib/stores";
	import { toast } from "svelte-french-toast";
	import autoselect from "svelte-autoselect";
	import { page } from "$app/stores";
	import { toggleChecked, editAmount, getCategory, getSort, getProducts } from "$lib/api";

	const supabase = $page.data.supabase;
	export let product: Product;

	async function deleteProduct() {
		if (confirm($wordList.index.deleteMessage)) {
			const { error } = await supabase.from("products").delete().eq("id", product.id);
			if (error) {
				toast.error("An error ocurred while deleting the product: " + error.message);
			} else {
				await getProducts(supabase);
			}
		}
	}

	async function editTitle(title: string) {
		if (title === product.title || title.trim().length === 0) return;

		const category = await getCategory(supabase, title);

		const sort = await getSort(supabase, category);

		const { error } = await supabase
			.from("products")
			.update({ title, category, sort })
			.eq("id", product.id);
		if (error) {
			toast.error("An error occurred while editing the product's title: " + error.message);
		} else {
			await getProducts(supabase);
		}
	}

	async function editType(type: string) {
		const { error } = await supabase.from("products").update({ type }).eq("id", product.id);
		if (error) {
			toast.error("An error ocurred while editing the product's quantity type: " + error.message);
		} else {
			await getProducts(supabase);
		}
	}

	async function changeCategory(category: string) {
		const { error } = await supabase.from("products").update({ category }).eq("id", product.id);
		if (error) {
			toast.error("An error occurred while changing the product's category: " + error.message);
		} else {
			await getProducts(supabase);
		}
	}

	let showChangeCategory = false;

	const categories = [
		"vegetables",
		"fruits",
		"pantry",
		"meat",
		"frozen",
		"cooled",
		"household",
		"sweets",
		"beverage"
	];
</script>

<div class="container">
	<div class="Card">
		<div class="ImageTitleQuantity">
			<!-- svelte-ignore a11y-click-events-have-key-events -->
			<img
				type="image"
				src="/category/{product.category}.svg"
				alt={$wordList.categories[product.category]}
				title={$wordList.categories[product.category]}
				on:click={() => {
					showChangeCategory = !showChangeCategory;
				}}
			/>
			<div class="TitleAndQuantity">
				<div
					id="title"
					contenteditable="true"
					on:blur={(event) => {
						editTitle(event.target.innerText);
					}}
				>
					{product.title}
				</div>
				<div class="quantity">
					<input
						use:autoselect
						type="text"
						class="amount"
						style="width: 4ch"
						maxlength="4"
						value={product.amount}
						on:blur={(event) => {
							editAmount(supabase, product, event.target.value);
						}}
					/>
					<select
						value={product.type}
						on:change={(event) => {
							editType(event.target.value);
						}}
					>
						<option value="stk">{$wordList.index["pcs"]}</option>
						<option value="btl">{$wordList.index["btl"]}</option>
						<option value="gr">{$wordList.index["gr"]}</option>
						<option value="kg">{$wordList.index["kg"]}</option>
						<option value="ml">{$wordList.index["ml"]}</option>
						<option value="l">{$wordList.index["l"]}</option>
					</select>
				</div>
			</div>
		</div>
		<div class="stats">
			<div class="status">
				<input
					type="checkbox"
					checked={product.checked}
					on:click={async () => {
						await toggleChecked(supabase, product);
					}}
				/>
				<input
					id="delete"
					type="image"
					src="/delete.svg"
					alt="delete"
					on:click={async () => {
						await deleteProduct();
					}}
				/>
			</div>
		</div>
	</div>
	{#if showChangeCategory}
		<div class="changeCategory" transition:slide>
			{#each categories as category}
				<!-- svelte-ignore a11y-click-events-have-key-events -->
				<div
					on:click={async () => {
						showChangeCategory = !showChangeCategory;
						await changeCategory(category);
					}}
				>
					<p>{$wordList.categories[category]}</p>
					<img
						src="/category/{category}.svg"
						alt={$wordList.categories[category]}
						title={$wordList.categories[category]}
					/>
				</div>
			{/each}
		</div>
	{/if}
</div>

<style>
	.Card {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 0.375rem;
		margin: 0.625rem 0;
		border-radius: 0.75rem;
		word-break: break-word;
		width: 100%;
	}

	.ImageTitleQuantity {
		display: flex;
		width: 100%;
	}

	img {
		height: 3.5rem;
		width: 3.5rem;
		cursor: pointer;
	}

	.TitleAndQuantity {
		margin-inline: 0.4rem;
		width: 100%;
	}

	#title {
		text-align: left;
		outline: none;
		font-size: 1.3rem;
		line-height: 1.5rem;
	}

	.quantity {
		display: flex;
	}

	.amount {
		margin: 0;
		outline: none;
		padding: 0.1rem 0.25rem;
		padding-left: 0;
		padding-top: 0.2rem;
		font-size: 1rem;
	}

	select {
		margin: 0;
		padding: 0.125rem 0.4rem;
		padding-left: 0;
		border-radius: 0.5rem;
		border-top-left-radius: 0;
		border-bottom-left-radius: 0;
		font-size: 1.1rem;
		outline: none;
	}

	.amount:hover,
	.amount:focus,
	#title:hover,
	#title:focus,
	select:hover,
	select:focus {
		border-color: var(--accent);
	}

	.amount,
	#title,
	select {
		border: 3px solid transparent;
		border-radius: 5px;
		transition: 0.2s ease-in-out all;
	}

	.status {
		display: flex;
		margin-top: 0.25rem;
		align-items: center;
		margin-left: auto;
	}

	input[type="checkbox"] {
		margin-left: auto;
		margin-right: 0.25rem;
		width: 1.75rem;
		height: 1.75rem;
		outline-color: var(--accent);
	}

	input[type="image"] {
		margin-right: auto;
		height: 2rem;
	}

	.changeCategory {
		display: grid;
		grid-template-columns: repeat(3, minmax(0, 1fr));
		border-radius: 0.75rem;
		margin: 0 0.625rem;
		padding: 0.2rem;
		border: 4px solid var(--minor);
	}

	.changeCategory > div {
		margin: 0.2rem;
		border-radius: 0.5rem;
		cursor: pointer;
	}

	.changeCategory > div:hover p {
		color: var(--accent);
	}

	.changeCategory > div > p {
		margin: 0;
		font-size: 1rem;
		line-height: 1.5rem;
		font-weight: 600;
	}

	.changeCategory > div > img {
		height: 2.5rem;
	}

	#delete {
		border: none;
	}
</style>
