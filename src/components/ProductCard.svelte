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
        <input type="image" src="/delete.png" alt="delete" on:click={() => {handleClick(product.id)}}>
    </div>
{/each}

<style>
    .Card {
        margin: 10px;
        background-color: #3A4750;
        padding: 10px 10px;
        border-radius: 10px;
        display: grid;
        grid-template-columns: 20px 1fr 30px;
    }

    label {
        background-color: #3A4750;
        font-size: 1.4em;
    }

    input[type=checkbox] {
        width: 20px;
        height: 20px;
        margin: auto;
    }

    input[type=image] {
        width: 30px;
        padding: 0;
        background-color: #3A4750;
        margin: auto;
    }
</style>