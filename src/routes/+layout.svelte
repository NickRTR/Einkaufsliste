<script lang="ts">
	import { page } from "$app/stores";
	import { Toaster } from "svelte-french-toast";
</script>

<svelte:head>
	<title>Email and Password Demo - Supabase Auth Helpers</title>
</svelte:head>

<main>
	<Toaster />

	<header>
		<a href="/" data-sveltekit-preload-code data-sveltekit-preload-data><h1>Schoppy</h1></a>
		<a
			data-sveltekit-preload-code
			data-sveltekit-preload-data
			href={$page.url.pathname === "/settings" ? "/" : "/settings"}
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

	:global(input, textarea) {
		outline: none;
		border: 3px solid var(--minor);
		transition: all 0.1s ease-in-out;
		border-radius: 1rem;
		font-size: 1rem;
		font-weight: 600;
		padding: 0.4rem 0.5rem;
		margin: 0.5rem 0;
	}

	:global(textarea) {
		padding: 0.5rem;
	}

	:global(input:hover, input:focus, textarea:hover, textarea:focus) {
		border-color: var(--accent) !important;
	}

	:global(button) {
		font-size: 1rem;
		outline: none;
		border: 3px solid var(--accent);
		transition: all 0.1s ease-in-out;
		padding: 0.3rem 0.7rem;
		background-color: var(--accent);
		color: var(--major);
		font-weight: 600;
		border-radius: 1rem;
		cursor: pointer;
		user-select: none;
	}

	:global(button:hover, button:focus) {
		border-color: var(--minor) !important;
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
