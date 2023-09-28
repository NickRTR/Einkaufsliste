<script>
	import { enhance } from "$app/forms";

	export let form;
</script>

<section>
	<div>
		<h1>Sign up</h1>
		{#if form?.error}
			<p class="error">{form.error}</p>
		{/if}
		{#if form?.message}
			<p class="success">{form.message}</p>
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
					<button>Sign up</button>
				</p>
			</div>
		</form>

		<div>
			<p>
				Already have an account? <a href="/login">Sign in</a>
			</p>
		</div>
	</div>
</section>

<style>
	.error {
		color: red;
	}

	.success {
		color: limegreen;
	}
</style>
