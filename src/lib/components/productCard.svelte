<script>
    import { deleteProduct, toggleChecked, changeCategory, updateAmount, updateType } from "$lib/supabase.js";

    export let product;
    let showChangeCategory = false;

    const categories = ["Gemüse", "Obst", "Vorrat", "Fleisch", "Gefriertruhe", "Kühlregal", "Haushalt", "Süßigkeiten", "Getränke"];
</script>
 
<div class="container">
    <div class="Card">
        <img type="image" src="/category/{product.category}.svg" alt={product.category} title={product.category} on:click={() => {showChangeCategory = !showChangeCategory}}>
        <p on:click={() => {showChangeCategory = !showChangeCategory}}>{product.title}</p>
        <div class="stats">
            <div class="quantity">
                <input type="text" maxlength="3" value={product.amount} on:input={(event) => {updateAmount(event.target.value, product.id)}}>
                <select value={product.type} on:change={(event) => {updateType(event.target.value, product.id);
                }}>
                    <option value="stk">stk</option>
                    <option value="gr">gr</option>
                    <option value="kg">kg</option>
                    <option value="ml">ml</option>
                    <option value="l">l</option>
                </select>
            </div>
            <div class="status">
                <input type="checkbox" bind:checked={product.checked} on:click={() => {toggleChecked(product.id, product.created, product.checked)}}>
                <input type="image" src="/delete.svg" alt="delete" on:click={() => {deleteProduct(product.id)}}>
            </div>
        </div>
    </div>
    {#if showChangeCategory}
        <div class="changeCategory">
            {#each categories as category}
                <div on:click={() => {showChangeCategory = !showChangeCategory; changeCategory(product.title, product.category, category, product.id)}}>
                    <p>{category}</p>
                    <img src="/category/{category}.svg" alt={category} title={category}>
                </div>
            {/each}
        </div>
    {/if}
</div>

<style>
    .container {
        color: black;
    }

    .Card {
        display: flex;
        align-items: center;
        word-break: break-all;
        padding: .375rem;
        margin: .625rem;
        background-color: var(--primary);
        border-radius: .75rem;
    }

    img {
        height: 3.5rem;
    }

    p {
        font-size: 1.5rem;
        line-height: 2rem;
        margin: 0 .5rem;
        font-weight: 500;
    }

    .stats {
        margin-left: auto;
    }

    .quantity {
        display: flex;
        margin-bottom: 0.25rem;
    }

    input[type=text] {
        width: 2rem;
        border-radius: .75rem;
        border-top-right-radius: 0;
        border-bottom-right-radius: 0;
        background-color: black;
        color: white;
        border: none;
        padding: .1rem .25rem;
        padding-top: .2rem;
        margin: 0;
        font-size: 1.1rem;
        line-height: 1.5rem;
        border: none;
    }

    select {
        border: none;
        margin: 0;
        padding: .125rem 0;
        padding-right: .4rem;
        border-radius: .5rem;
        border-top-left-radius: 0;
        border-bottom-left-radius: 0;
        background-color: black;
        color: white;
        font-size: 1.1rem;
    }

    .status {
        display: flex;
        margin-top: .25rem;
        align-items: center;
    }

    input[type=checkbox] {
        margin-left: auto;
        margin-right: .25rem;
        width: 1.75rem;
        height: 1.75rem;
        /* vertical-align: middle; */
    }

    input[type=image] {
        margin-right: auto;
        height: 2rem;
    }

    .changeCategory {
        display: grid;
        grid-template-columns: repeat(3, minmax(0, 1fr));
        justify-content: center;
        border-radius: .75rem;
        margin: 0 .625rem;
        background-color: var(--primary);
        padding: .2rem;
    }

    .changeCategory > div {
        margin: .2rem;
        border-radius: .5rem;
        border: 2px solid black;
    }

    .changeCategory > div > p {
        margin: 0;
        font-size: 1rem;
        line-height: 1.5rem;
        font-weight: 600;
    }

    .changeCategory > div > img {
        height: 2.5rem;
        margin: 0 auto;
        margin-bottom: .2rem;
    }
</style>