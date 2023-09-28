<script>
	// import Nav from "$lib/components/Nav.svelte";
	// import { Toaster } from "svelte-french-toast";

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

<body>
	<!-- <Toaster />
	<Nav avatarUrl={data.avatarUrl} /> -->
	<div class="content"><slot /></div>
</body>

<style>

</style>
