<script>
	import { Toaster } from "svelte-french-toast";

	import { invalidate } from "$app/navigation";
	import { onMount } from "svelte";

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
	<div class="content"><slot /></div>
</body>

<style>
	* {
		font-family: Arial, Helvetica, sans-serif;
		text-align: center;
		color: var(--minor);
		background-color: var(--major);
		margin: 0.5rem 0.5rem;
	}

	:global(:root) {
		--background: white;
		--text: black;
		--accent: #0047ff;
		--accentTransparent: #0047ff44;
	}
</style>
