<script>
	import { _, locale, locales } from "svelte-i18n";
	import Feedback from "$lib/components/Feedback.svelte";

	export let data;

	function changeLanguage(event) {
		locale.set(event.target.value);
		localStorage.setItem("lang", event.target.value);
	}
</script>

<svelte:head>
	<title>{$_("pages.settings.title")}</title>
</svelte:head>

<body>
	<div class="grid">
		<section class="account">
			<h2>{data.session.user.email}</h2>
			<button><a href="/logout">{$_("pages.settings.logout")}</a></button>
		</section>

		<section class="language">
			<h2>{$_("pages.settings.language")}</h2>
			<select
				value={$locale}
				on:change={() => {
					changeLanguage(event);
				}}
			>
				{#each $locales as locale}
					<option value={locale}>{$_("pages.settings.languages." + locale)}</option>
				{/each}
			</select>
		</section>

		<section class="list">
			<h2>{$_("pages.settings.list.title")}</h2>
			<button>{$_("pages.settings.list.share")}</button>
			<button>{$_("pages.settings.list.delete_all")}</button>
		</section>

		<section class="quantityTypes">
			<h2>{$_("pages.settings.quantityTypes.title")}</h2>
		</section>

		<section class="categories">
			<h2>{$_("pages.settings.categories.title")}</h2>
			<button>{$_("pages.settings.categories.sort_categories")}</button>
			<button>{$_("pages.settings.categories.reset_categories")}</button>
		</section>

		<section class="feedback">
			<h2>{$_("pages.settings.feedback.title")}</h2>
			<Feedback />
		</section>
	</div>
</body>

<style>
	.grid {
		display: grid;
		grid-template-columns: 1fr 1fr;
		grid-gap: 1rem;
	}

	h2 {
		margin-top: 0.5rem;
		margin-bottom: 1rem;
	}

	button {
		display: block;
		margin-inline: auto;
	}

	.grid > section {
		text-align: center;
		padding: 1rem;
		border-radius: 1rem;
		background-color: #0047ff1f;
	}

	.account {
		grid-column: span 2;
	}

	.account > button > a {
		color: inherit;
		text-decoration: none;
	}

	.list {
		grid-row: span 2;
	}

	.categories {
		grid-row: span 2;
	}

	.quantityTypes {
		grid-row: span 3;
	}

	.feedback {
		grid-column: span 2;
	}
</style>
