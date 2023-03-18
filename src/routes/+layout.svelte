<script lang="ts">
	import { applyAction, enhance, type SubmitFunction } from "$app/forms";
	import { invalidate } from "$app/navigation";
	import { page } from "$app/stores";

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
	<div>
		<div>
			{#if $page.data.session}
				<form action="/logout" method="post" use:enhance={handleLogout}>
					<button disabled={loading} type="submit">Sign out</button>
				</form>
			{/if}
		</div>
	</div>

	<slot />
</main>
