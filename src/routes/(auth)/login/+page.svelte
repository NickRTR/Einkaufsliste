<script>
	import { enhance } from "$app/forms";

	export let form;
</script>

<section>
	<div>
		<h1>Sign in</h1>
		{#if form?.error}
			<p class="error">{form.error}</p>
		{/if}
		<form method="post" use:enhance>
			<div>
				<label for="email">Email</label>
				<p>
					<input
						id="email"
						name="email"
						value={form?.values?.email ?? ""}
						type="email"
						placeholder="Email"
						required
					/>
				</p>
			</div>
			<div>
				<label for="password">Password</label>
				<p>
					<input id="password" name="password" type="password" placeholder="Password" required />
				</p>
			</div>
			<div>
				<p>
					<button>Sign in</button>
				</p>
			</div>
		</form>

		<div>
			<p>
				Don't have an account? <a href="/signup">Sign up</a>
			</p>
		</div>
	</div>
</section>

<style>
	.error {
		color: red;
	}
</style>
