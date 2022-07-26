<script context="module">
	import { getProducts } from "$lib/api";
	import { toast } from "@zerodevx/svelte-toast";

	export async function load({ session, fetch }) {
		if (!session.user) {
			return {
				status: 302,
				redirect: "/auth/login"
			};
		}

		await getProducts(fetch);

		const res = await fetch("/api/userdata/getPriorities");
		const data = await res.json();

		if (data.error) {
			toast.push("An error ocurred while fetching priorities: " + data.error);
		} else {
			return {
				status: 200,
				props: {
					priorities: data.priorities,
					session
				}
			};
		}

		return {
			status: 500
		};
	}
</script>

<script>
	// @ts-nocheck
	import { wordList, products } from "$lib/stores";
	import { slide } from "svelte/transition";
	import { browser } from "$app/env";
	import DragDropList from "$lib/components/DragDropList.svelte";

	export let priorities;
	export let session;

	let showSort = false;
	let language;
	if (browser) {
		language = navigator.language == "en-US" ? "en-US" : navigator.language.substring(0, 2);
		if (localStorage.getItem("language")) language = localStorage.getItem("language");
	}

	function changeLanguage() {
		localStorage.setItem("language", language);
		location.reload();
	}

	function shareList() {
		let data = "Schoppy\n\n";

		// alle Produkte der Einkaufsliste zu einer zu teilenden Liste zusammenfassen.
		for (let i = 0; i < $products.length; i++) {
			let product = $products[i];
			if (!product.checked) data += `◯ ${product.title} (${product.amount} ${product.type}) (${$wordList.categories[product.category]}) \n`; // only add if product is unchecked
		}

		if (navigator.share) {
			navigator
				.share({
					title: `Schoppy - ${$wordList.index.share}`,
					text: data
				})
				.catch((error) => {
					toast.push(error);
				});
		} else {
			toast.push("Your device/browser isn't able to share this list.");
		}
	}

	async function deleteAll(confirmMessage) {
		if (confirm(confirmMessage)) {
			const res = await fetch("/api/deleteAllProducts");
			const data = await res.json();

			if (data.error) {
				toast.push("An error ocurred while deleting all products: " + data.error);
			}
		}
	}

	async function changePriorities(changedPriorities) {
		const res = await fetch(`/api/changePriorities-${changedPriorities}`);
		const data = await res.json();

		if (data.error) {
			toast.push("An error ocurred while changing priority order: " + data.error);
		} else {
			for (let i in $products) {
				const product = $products[i];
				const getSortRes = await fetch(`/api/getSort-${product.category}`);
				const getSortData = await getSortRes.json();

				if (!getSortData.error) {
					const setSortRes = await fetch(`/api/updateSort-${product.id}-${getSortData.sort}`);
					const data = await setSortRes.json();

					if (data.error) {
						toast.push("An error ocurred while updating sort order: " + data.error);
					}
				} else {
					toast.push("An error ocurred while updating sort order: " + getSortData.error);
				}
			}
		}
	}
</script>

<main>
	<div class="language">
		<h2>{$wordList.settings.language.language}: <br /></h2>
		<select name="language" id="language" bind:value={language} on:change={changeLanguage}>
			<option value="de">{$wordList.settings.language.German}</option>
			<option value="en">{$wordList.settings.language.English}</option>
			<option value="en-US">{$wordList.settings.language.AmericanEnglish}</option>
			<option value="es">{$wordList.settings.language.Spanish}</option>
			<option value="fr">{$wordList.settings.language.French}</option>
			<option value="zh">{$wordList.settings.language.Chinese}</option>
			<option value="jp">{$wordList.settings.language.Japanese}</option>
			<option value="ar">{$wordList.settings.language.Arabic}</option>
		</select>
	</div>

	<div class="list">
		<h2>{$wordList.settings.list}:</h2>
		<button on:click={shareList} title={$wordList.index.share}>{$wordList.index.share}</button>
		<button
			on:click={() => {
				deleteAll($wordList.index.deleteMessage);
			}}
			title={$wordList.index.deleteAll}>{$wordList.index.deleteAll}</button
		>
		<br />
		<button
			id="sortButton"
			on:click={() => {
				showSort = !showSort;
			}}
			title={$wordList.index.sort}>{$wordList.index.sort}</button
		>
		{#if showSort}
			<div class="sort" transition:slide|local={{ duration: 800 }}>
				<DragDropList bind:data={priorities} wordList={$wordList.categories} />
				<button
					class="submitSort"
					type="submit"
					on:click|preventDefault={() => {
						changePriorities(priorities);
						showSort = !showSort;
					}}>{$wordList.index.sort}</button
				>
			</div>
		{/if}
	</div>

	<div class="user">
		<h2>{session?.user.email ? session.user.email : ""}</h2>
		<a href="/auth/logout" title={$wordList.index.logout}><button>{$wordList.index.logout}</button></a>
	</div>
</main>

<style>
	button {
		border-radius: 2rem;
		padding: 0.3em 0.8rem;
		font-size: 1rem;
		font-weight: bold;
		background-color: var(--accent);
		border: 3px solid var(--accent);
		outline: none;
	}

	button:hover,
	button:focus {
		border-color: var(--minor);
	}

	select {
		border-radius: 1rem;
		padding: 0.2rem 0.5rem;
		font-weight: bold;
	}

	.sort {
		margin: 0 3rem;
		padding: 0.625rem;
	}

	.list h2 {
		margin-bottom: 0.8rem;
	}

	.list button {
		margin: 0.5rem 0.25rem;
	}
</style>
