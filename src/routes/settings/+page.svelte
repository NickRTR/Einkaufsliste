<script lang="ts">
	import { applyAction, enhance, type SubmitFunction } from "$app/forms";
	import { invalidate } from "$app/navigation";
	import { wordList, products } from "$lib/stores";
	import { slide } from "svelte/transition";
	import { browser } from "$app/environment";
	import { toast } from "svelte-french-toast";
	import DragDropList from "$lib/components/DragDropList.svelte";
	import Feedback from "$lib/components/Feedback.svelte";

	const handleLogout: SubmitFunction = () => {
		return async ({ result }) => {
			if (result.type === "redirect") {
				await invalidate("supabase:auth");
			} else {
				await applyAction(result);
			}
		};
	};

	export let data;

	let priorities = data.priorities;

	let showSort = false;
	let language: string;
	if (browser) {
		language = navigator.language == "en-US" ? "en-US" : navigator.language.substring(0, 2);
		if (localStorage.getItem("language")) language = localStorage.getItem("language")!;
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
			if (!product.checked)
				data += `◯ ${product.title} (${product.amount} ${product.type}) (${
					$wordList.categories[product.category]
				}) \n`; // only add if product is unchecked
		}

		if (navigator.share) {
			navigator
				.share({
					title: `Schoppy - ${$wordList.index.share}`,
					text: data
				})
				.catch((error) => {
					toast.error(error);
				});
		} else {
			toast.error("Your device/browser isn't able to share this list.");
		}
	}

	async function deleteAll(confirmMessage: string) {
		if (confirm(confirmMessage)) {
			let { error } = await data.supabase.from("products").delete().neq("id", 0);

			if (error) {
				toast.error("An error ocurred while deleting all products: " + error.message);
			}
		}
	}

	async function changePriorities(changedPriorities: priorities) {
		const { error } = await data.supabase
			.from("userdata")
			.update({ priorities: changedPriorities })
			.eq("uuid", data.user.id);
		if (error) {
			toast.error("An error ocurred while changing priority order: " + error.message);
		} else {
			for (let i in $products) {
				const product = $products[i];

				let { data: priorities, error } = await data.supabase.from("userdata").select("priorities");

				if (error) {
					toast.error("An error ocurred while changing priority order: " + error.message);
				} else {
					priorities = priorities[0].priorities;
					if (product.category === "choose") {
						return new Response(JSON.stringify({ sort: 0 }));
					}
					for (let i = 0; i <= Object.keys(priorities).length; i++) {
						if (priorities[i] === product.category) {
							const { error } = await data.supabase
								.from("products")
								.update({ sort: i + 1 })
								.eq("id", product.id);
							if (error) {
								toast.error("An error ocurred while changing priority order: " + error.message);
							}
						}
					}
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
		<h2>{data.user.email ? data.user.email : ""}</h2>
		<form action="/logout" method="post" use:enhance={handleLogout}>
			<button type="submit">{$wordList.index.logout}</button>
		</form>
	</div>

	<hr />

	<div class="feedback">
		<h2>{$wordList.settings.feedback.title}</h2>
		<Feedback />
	</div>
</main>

<style>
	hr {
		margin-top: 2rem;
	}

	select {
		border: none;
	}

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
