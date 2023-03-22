<script>
	import { wordList } from "$lib/stores";

	let submitted = false;

	async function toggleSubmitted() {
		// wait for 1 second in order to let the form carry out
		await new Promise((resolve) => setTimeout(resolve, 1000));
		submitted = true;
	}
</script>

<main>
	{#if submitted}
		<p class="thanks">{$wordList.settings.feedback.thanks}</p>
	{:else}
		<form
			id="form"
			action="https://formsubmit.co/nickrtrrtr@gmail.com"
			target="_blank"
			method="POST"
		>
			<label for="email">{$wordList.settings.feedback.nameLabel}</label>
			<input type="text" name="name" id="name" placeholder={$wordList.settings.feedback.name} />
			<label for="message">{$wordList.settings.feedback.messageLabel}</label>
			<textarea
				name="message"
				id="message"
				placeholder={$wordList.settings.feedback.message}
				required
			/>
			<button
				on:click={() => {
					toggleSubmitted();
				}}
				type="submit">{$wordList.settings.feedback.submit}</button
			>
			<input type="hidden" name="_subject" value="Schoppy: New feedback submission!" />
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
		width: unset !important;
	}

	button {
		margin-bottom: 1rem;
	}

	textarea {
		height: 100px !important;
		resize: none;
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
