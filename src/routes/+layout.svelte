<script lang="ts">
	import { applyAction, enhance, type SubmitFunction } from "$app/forms";
	import { invalidate } from "$app/navigation";
	import { page } from "$app/stores";
	import { Toaster } from "svelte-french-toast";

	let loading = false;

	const handleLogout: SubmitFunction = () => {
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
</script>

<svelte:head>
	<title>Email and Password Demo - Supabase Auth Helpers</title>
</svelte:head>

<main>
	<Toaster />

	<div>
		<div>
			{#if $page.data.session}
				<form action="/logout" method="post" use:enhance={handleLogout}>
					<button disabled={loading} type="submit">Sign out</button>
				</form>
			{/if}
		</div>
	</div>

	<header>
		<a href="/" data-sveltekit-prefetch><h1>Schoppy</h1></a>
		<a data-sveltekit-prefetch href={$page.url.pathname === "/settings" ? "/" : "/settings"}
			><img src="/settings.svg" alt="⚙" title="settings" /></a
		>
	</header>

	<body><slot /></body>
</main>

<style>
	* {
		font-family: Arial, Helvetica, sans-serif;
		text-align: center;
		color: var(--minor);
		background-color: var(--major);
		margin: 0.5rem 0.75rem;
	}

	main {
		max-width: 700px;
		margin: auto;
	}

	header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 0.5rem 0;
	}

	h1 {
		margin: 0;
		padding-bottom: 0.5rem;
		cursor: pointer;
		line-height: 2rem;
	}

	a {
		text-decoration: none;
		cursor: pointer;
		line-height: 0;
		outline: none;
		border-bottom: 4px solid var(--major);
		transition: 0.2s all ease-in-out;
	}

	a:focus,
	a:hover {
		border-color: var(--accent);
	}

	img {
		border-radius: 100%;
		margin: 0;
		padding: 0.5rem;
		width: 2.2rem;
		cursor: pointer;
	}

	:global(input) {
		outline: none;
		border: 2px solid transparent;
		transition: all 0.1s ease-in-out;
		border-radius: 1rem;
		font-size: 1.2rem;
		font-weight: 600;
		padding: 0 0.5rem;
		margin: 0.5rem 0;
		height: 2rem;
	}

	:global(input:hover, input:focus) {
		border-color: var(--accent);
	}

	:global(button) {
		font-size: 1rem;
		outline: none;
		border: 3px solid transparent;
		transition: all 0.1s ease-in-out;
		padding: 0.3rem 0.7rem;
		margin-top: 0.5rem;
		background-color: var(--accent);
		color: var(--major);
		font-weight: 600;
		border-radius: 1rem;
		cursor: pointer;
		user-select: none;
	}

	:global(button:hover, button:focus) {
		border-color: var(--minor);
	}

	:global(a) {
		color: var(--minor);
	}

	:global(.error) {
		color: tomato;
	}

	:global(:root) {
		--major: white;
		--minor: black;
		--accent: #0047ff;
		--accentTransparent: #0047ff44;
	}

	/* Toast styles */
	:root {
		--toastContainerTop: auto;
		--toastContainerRight: auto;
		--toastContainerBottom: 2rem;
		--toastContainerLeft: calc(50vw - 8rem);
		--toastBackground: rgb(245, 245, 245);
		--toastBarBackground: tomato;
		--toastColor: var(--minor);
		--toastBorderRadius: 0.5rem;
	}
</style>
