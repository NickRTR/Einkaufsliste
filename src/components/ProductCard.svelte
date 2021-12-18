<script>
    import ProductData from "../data/ProductData";

    const handleClick = (id) => {
        ProductData.update(currentProducts => {
            return currentProducts.filter(product => product.id != id)
        })
    }
</script>

{#each $ProductData as product}
    <div class="Card">
        <input type="checkbox" id="checkbox+{product.id}" bind:checked={product.checked}>
        <label for="checkbox+{product.id}" on:click>{product.title}</label>
        <button on:click={() => {handleClick(product.id)}}>Delete</button>
    </div>
{/each}

<style>
    .Card {
        margin: auto;
        margin-top: 10px;
        background-color: #3A4750;
        padding: 10px 10px;
        border-radius: 10px;
        display: grid;
        grid-template-columns: 20px 1fr 70px;
        align-items: flex-start;
        font-size: 1.4em;
    }

    label {
        background-color: #3A4750;
    }

    input {
        width: 20px;
        height: 20px;
        margin: auto;
    }

    button {
        background-color: #F6C90E;
        color: #303841;
        font-size: 0.9em;
        border: none;
        margin: 0;
        border-radius: 2px;
    }
</style>