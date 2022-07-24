<script>
	import { slide } from "svelte/transition";
	import { wordList } from "$lib/stores";
	import { getProducts } from "$lib/api";
	import { toast } from "@zerodevx/svelte-toast";

	export let product;
	let showChangeCategory = false;

	const categories = ["vegetables", "fruits", "pantry", "meat", "frozen", "cooled", "household", "sweets", "beverage"];

	async function toggleChecked(id, checked) {
		const res = await fetch(`/api/toggleChecked-${id}-${checked}`);
		const data = await res.json();

		if (data.error) {
			toast.push("An error occured while toggling the product's state: " + data.error);
		}

		await getProducts();
	}

	async function deleteProduct(id) {
		if (confirm($wordList.index.deleteMessage)) {
			const res = await fetch(`/api/deleteProduct-${id}`);
			const data = await res.json();

			if (data.error) {
				toast.push("An error occured while deleting the product: " + data.error);
			}

			await getProducts();
		}
	}

	async function editTitle(id, title) {
		const categoryRes = await fetch(`/api/getCategory-${title}`);
		const categoryData = await categoryRes.json();

		if (categoryData.error) {
			toast.push("An error occured while processing the product's category: " + categoryData.error);
		} else {
			const sortRes = await fetch(`/api/getSort-${categoryData.category}`);
			const sortData = await sortRes.json();

			if (sortData.error) {
				toast.push("An error occured while processing the product's sort position: " + sortData.error);
			} else {
				if (title === product.title || title.trim().length === 0) return;

				const res = await fetch(`/api/editTitle-${id}-${title}-${categoryData.category}-${sortData.sort}`);
				const data = await res.json();

				await getProducts();

				if (data.error) {
					toast.push("An error occured while editing the product's title: " + data.error);
				}
			}
		}
	}

	async function editAmount(id, amount) {
		if (amount === product.amount || amount.trim().length === 0) return;

		const res = await fetch(`/api/editAmount-${id}-${amount}`);
		const data = await res.json();

		if (data.error) {
			toast.push("An error occured while editing the quantity amount: " + data.error);
		}
	}

	async function editType(id, type) {
		const res = await fetch(`/api/editType-${id}-${type}`);
		const data = await res.json();

		if (data.error) {
			toast.push("An error occured while editing the quantity type: " + data.error);
		}
	}

	async function changeCategory(id, category) {
		const categoryRes = await fetch("/api/getCategories");
		const categoryData = await categoryRes.json();

		if (categoryData.error) {
			toast.push("An error occured while changing the product's category: " + categoryData.error);
		} else {
			let categories = categoryData.categories;
			if (product.category !== "choose") {
				categories[product.category] = categories[product.category].filter((value) => value != product.title.toLowerCase());
			}
			categories[category] = [product.title.toLowerCase(), ...categories[category]];

			const updateRes = await fetch("/api/updateCategories", {
				method: "POST",
				body: JSON.stringify({
					categories
				})
			});
			const updateData = await updateRes.json();

			if (updateData.error) {
				toast.push("An error occured while changing the product's category: " + updateData.error);
			}
		}

		const sortRes = await fetch(`/api/getSort-${category}`);
		const sortData = await sortRes.json();

		if (sortData.error) {
			toast.push("An error occured while changing the product's category: " + sortData.error);
		} else {
			const res = await fetch(`/api/changeCategory-${id}-${category}-${sortData.sort}`);
			const data = await res.json();

			if (data.error) {
				toast.push("An error occured while changing the product's category: " + data.error);
			}

			await getProducts();
		}
	}
</script>

<div class="container">
	<div class="Card">
		<div class="ImageTitleQuantity">
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
						editTitle(product.id, event.target.innerText);
					}}
				>
					{product.title}
				</div>
				<div class="quantity">
					<input
						type="text"
						class="amount"
						style="width: 3ch"
						maxlength="3"
						value={product.amount}
						on:blur={(event) => {
							editAmount(product.id, event.target.value);
						}}
					/>
					<select
						value={product.type}
						on:change={(event) => {
							editType(product.id, event.target.value);
						}}
					>
						<option value="stk">{$wordList.index["pcs"]}</option>
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
					on:click={() => {
						toggleChecked(product.id, product.checked);
					}}
				/>
				<input
					type="image"
					src="/delete.svg"
					alt="delete"
					on:click={() => {
						deleteProduct(product.id, $wordList.index.deleteMessage);
					}}
				/>
			</div>
		</div>
	</div>
	{#if showChangeCategory}
		<div class="changeCategory" transition:slide>
			{#each categories as category}
				<div
					on:click={() => {
						showChangeCategory = !showChangeCategory;
						changeCategory(product.id, category, product.title);
					}}
				>
					<p>{$wordList.categories[category]}</p>
					<img src="/category/{category}.svg" alt={$wordList.categories[category]} title={$wordList.categories[category]} />
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
		font-weight: 500;
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
</style>
