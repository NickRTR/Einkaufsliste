<script>
	import { _ } from "svelte-i18n";
	import { enhance } from "$app/forms";

	export let form;
</script>

<section>
	<div>
		<h1>{$_("pages.auth.login.title")}</h1>
		{#if form?.error}
			<p class="error">{form.error}</p>
		{/if}
		<form method="post" use:enhance>
			<div>
				<label for="email">{$_("pages.auth.email")}</label>
				<p>
					<input
						id="email"
						name="email"
						value={form?.values?.email ?? ""}
						type="email"
						placeholder={$_("pages.auth.email")}
						required
					/>
				</p>
			</div>
			<div>
				<label for="password">{$_("pages.auth.password")}</label>
				<p>
					<input
						id="password"
						name="password"
						type="password"
						placeholder={$_("pages.auth.password")}
						required
					/>
				</p>
			</div>
			<div>
				<p>
					<button>{$_("pages.auth.login.title")}</button>
				</p>
			</div>
		</form>

		<div>
			<p>
				{$_("pages.auth.login.switch")} <a href="/signup">{$_("pages.auth.signup.title")}</a>
			</p>
		</div>
	</div>
</section>

<style>
	.error {
		color: tomato;
	}

	input {
		border-radius: 0.6rem;
		padding: 0.3rem 0.5rem;
		width: 250px;
		font-size: 1rem;
	}

	input:hover, input:focus {
		border-color: var(--accent);
	}

	p {
		margin-top: 0.5rem;
	}
</style>
