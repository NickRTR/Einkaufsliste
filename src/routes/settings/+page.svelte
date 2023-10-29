<script>
	import { _ } from "svelte-i18n";
	import Feedback from "$lib/components/Feedback.svelte";

	export let data;
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
			<select>
				<option value="de">{$_("pages.settings.languages.de")}</option>
				<option value="en">{$_("pages.settings.languages.en")}</option>
			</select>
		</section>

		<section class="list">
			<h2>{$_("pages.settings.list.title")}</h2>
			<button>{$_("pages.settings.list.share")}</button>
			<button>{$_("pages.settings.list.sort_categories")}</button>
			<button>{$_("pages.settings.list.delete_all")}</button>
		</section>

		<section />

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

	.grid > section {
		text-align: center;
		padding: 1rem;
		border-radius: 1rem;
		background-color: gainsboro;
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

	.list > button {
		margin-inline: auto;
		display: block;
	}

	.feedback {
		grid-column: span 2;
	}
</style>
