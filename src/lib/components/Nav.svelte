<script>
	import { page } from "$app/stores";
	import { _ } from "svelte-i18n";
</script>

<nav>
	<a class:active={$page.url.pathname === "/"} href="/" title="home">{$_("layout.menu.home")}</a>
	<a class:active={$page.url.pathname === "/settings"} href="/settings" title="settings"
		>{$_("layout.menu.settings")}</a
	>
</nav>

<style>
	nav {
		margin-top: 1rem;
		display: flex;
		justify-content: center;
		gap: 1rem;
	}

	a {
		font-size: 1.3rem;
		text-decoration: none;
		color: var(--background);
	}

	.active {
		text-decoration: underline;
		text-decoration-color: var(--accent);
	}
</style>
