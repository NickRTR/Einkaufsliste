<script lang="ts">
	import type { ActionData } from "./$types";
	import { applyAction, enhance, type SubmitFunction } from "$app/forms";
	import { invalidate } from "$app/navigation";
	import { wordList } from "$lib/stores";

	export let form: ActionData;
	let loading = false;

	const handleSubmit: SubmitFunction = () => {
		loading = true;
		return async ({ result }) => {
			if (result.type === "redirect") {
				await invalidate("supabase:auth");
			} else {
				await applyAction(result);
			}
			loading = false;
		};
	};

	let showPassword = false;
</script>

<svelte:head>
	<title>Schoppy - {$wordList.login.registered.title}</title>
</svelte:head>

<body>
	<h1>{$wordList.login.registered.title}</h1>

	<form method="post" use:enhance={handleSubmit}>
		<label for="email">E-mail: </label><br />
		<input
			id="email"
			name="email"
			value={form?.values?.email ?? ""}
			type="email"
			placeholder="email@email.com"
			required
		/><br />
		<label for="password">{$wordList.login.password}:</label><br />
		<div class="password">
			<input
				id="password"
				name="password"
				type="password"
				placeholder={$wordList.login.password}
				required
			/>
			<input
				type="checkbox"
				id="togglePassword"
				class:show={showPassword}
				bind:checked={showPassword}
				on:change={() => {
					document.querySelector("#password").type = showPassword ? "text" : "password";
				}}
			/>
			<label class="viewPasswordLabel" for="togglePassword"
				><img src="/showPassword.svg" alt="show" /></label
			><br />
		</div>
		<button disabled={loading}>{$wordList.login.registered.title}</button>
	</form>

	{#if form?.error}
		<p class="error">Error: {form.error}</p>
	{/if}

	<a href="/signup">{$wordList.login.registered.switch}</a>
</body>

<style>
	form {
		margin-top: 1rem;
		font-weight: 600;
	}

	input[type="email"] {
		width: 300px;
	}

	#password {
		width: 268px;
	}

	input::placeholder {
		font-size: 1rem;
	}

	.password {
		display: flex;
		align-items: center;
		justify-content: center;
	}

	input[type="checkbox"] {
		display: none;
	}

	.viewPasswordLabel {
		filter: opacity(50%);
		border-radius: 100%;
	}

	input[type="checkbox"]:checked + .viewPasswordLabel {
		filter: opacity(100%);
	}

	img {
		width: 2rem;
		cursor: pointer;
	}
</style>
