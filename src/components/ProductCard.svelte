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