<script>
	import { wordList } from "$lib/stores";
	import { page } from "$app/stores";

	let submitted = $page.url.search === "?thanks=true";
</script>

<svelte:head>
	<title>Nick Reutlinger - Contact</title>
</svelte:head>

<main>
	{#if submitted}
		<p class="thanks">{$wordList.settings.feedback.thanks}</p>
	{:else}
		<form action="https://formsubmit.co/nickrtrrtr@gmail.com" method="POST">
			<label for="email">{$wordList.settings.feedback.nameLabel}</label>
			<input type="text" name="name" id="name" placeholder={$wordList.settings.feedback.name} required />
			<label for="message">{$wordList.settings.feedback.messageLabel}</label>
			<textarea name="message" id="message" placeholder={$wordList.settings.feedback.message} required />
			<button type="submit">{$wordList.settings.feedback.submit}</button>
			<input type="hidden" name="_subject" value="Schoppy: New feedback submission!" />
			<input type="hidden" name="_next" value="https://schoppy.vercel.app/settings?thanks=true" />
		</form>
	{/if}
</main>

<style>
	form {
		max-width: 400px;
		margin: auto;
		display: flex;
		flex-direction: column;
	}

	label {
		padding-block: 0.5rem;
	}

	textarea,
	input,
	button {
		border-radius: 1rem;
		padding: 0.4rem;
		font-size: 1rem;
		transition: 0.1s ease-in-out;
		width: unset !important;
		margin-bottom: 0.5rem;
	}

	textarea,
	input {
		border: 2px solid black;
	}

	textarea {
		height: 100px !important;
		resize: none;
	}

	button {
		font-weight: bold;
		border: 3px solid var(--accent);
	}

	button:focus,
	button:hover {
		border-color: var(--minor);
	}

	textarea:hover,
	input:hover,
	textarea:focus,
	input:focus {
		background-color: var(--accentTransparent);
	}

	.thanks {
		color: var(--accent);
	}

	@media only screen and (max-width: 900px) {
		input,
		textarea {
			width: 300px;
		}

		textarea {
			height: 150px;
		}
	}
</style>
