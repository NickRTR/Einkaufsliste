<script>
	let input = "";

	function addProduct() {
		if (input.trim() === "") return;
		
	}
</script>

<body>
	<form>
		<input type="text" bind:value={input} />
		<button type="submit" on:click={addProduct}>Hinzufügen</button>
	</form>
</body>

<style>
	form {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 0.5rem;
	}

	input {
		width: 55%;
		padding: 0.25rem 0.5rem;
		font-size: 1.25rem;
		border-radius: 0.75rem;
		border: 3px solid var(--text);
		background-color: var(--background);
		outline: none;
	}

	input:hover,
	input:focus {
		border-color: var(--accent);
	}

	input::placeholder {
		font-weight: normal;
	}

	button {
		height: 2.2rem;
	}
</style>
