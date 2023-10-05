<script>
	import { page } from "$app/stores";
</script>

<nav>
	<a class:active={$page.url.pathname === "/"} href="/" title="Create"
		><img src="/nav/edit.svg" width="50px" alt="" /></a
	>
	<a class:active={$page.url.pathname === "/view"} href="/view" title="View"
		><img src="/nav/view.svg" width="50px" alt="" /></a
	>
	<a class:active={$page.url.pathname === "/settings"} href="/settings" title="settings"
		><img src="/nav/settings.svg" width="40px" alt="" /></a
	>
</nav>

<style>
	nav {
		position: fixed;
		bottom: 25px;
		left: 50%;
		transform: translateX(-50%);
		display: flex;
		justify-content: space-between;
		align-items: center;
		width: 200px;

		border: 3px solid var(--text);
		border-radius: 15px;
		padding: 1rem 1.5rem;
		background-color: var(--text);
	}

	a {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 2.5rem;
		height: 2.5rem;
		border: none;
		font-size: 1.5rem;
		padding: 0;
		text-decoration: none;
		color: var(--background);
		text-align: center;
	}

	.active {
		background-color: red;
		color: white;
	}
</style>
