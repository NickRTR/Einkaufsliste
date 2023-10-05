<script>
	import { Toaster } from "svelte-french-toast";
	import { onMount } from "svelte";
	import { invalidate } from "$app/navigation";

	import NavBar from "$lib/components/NavBar.svelte";

	export let data;

	onMount(() => {
		const {
			data: { subscription }
		} = data.supabase.auth.onAuthStateChange((event, _session) => {
			if (_session?.expires_at !== data.session?.expires_at) {
				invalidate("supabase:auth");
			}
		});

		return () => subscription.unsubscribe();
	});
</script>

<svelte:head>
	<title>Schoppy</title>
</svelte:head>

<body>
	<Toaster />
	<header>
		<h1>Schoppy</h1>
	</header>
	<main><slot /></main>
	{#if data.session}
		<footer>
			<NavBar />
		</footer>
	{/if}
</body>

<style>
	* {
		font-family: Arial, Helvetica, sans-serif;
		color: var(--minor);
		background-color: var(--major);
		margin: 0.5rem;
	}

	body {
		max-width: 700px;
		margin: auto;
	}

	header {
		text-align: center;
		margin-block: 1rem;
	}

	:global(:root) {
		--background: white;
		--text: black;
		--accent: #0047ff;
		--accentTransparent: #0047ff44;
	}
</style>
