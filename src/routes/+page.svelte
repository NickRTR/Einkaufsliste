<script lang="ts">
	import type { PageData } from "./$types";
	import toast from "svelte-french-toast";

	export let data: PageData;

	if (data.error) {
		toast.error(data.error);
	}
</script>

<!-- <div>
	<p>Protected content for {user.email}</p>
	<p>server-side fetched data with RLS:</p>
	<pre>{JSON.stringify(testTable, null, 2)}</pre>
</div>
<div>
	<p>user:</p>
	<pre>{JSON.stringify(user, null, 2)}</pre>
</div> -->
