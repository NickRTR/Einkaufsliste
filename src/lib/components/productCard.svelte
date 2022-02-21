<script>
    import { updateTitle, deleteProduct, toggleChecked, changeCategory, updateAmount, updateType } from "$lib/supabase.js";

    export let product;
    export let wordList;
    let showChangeCategory = false;

    const categories = ["Gemüse", "Obst", "Vorrat", "Fleisch", "Gefriertruhe", "Kühlregal", "Haushalt", "Süßigkeiten", "Getränke"];
</script>
 
<div class="container">
    <div class="Card">
        <img type="image" src="/category/{product.category}.svg" alt={wordList.categories[product.category]} title={wordList.categories[product.category]} on:click={() => {showChangeCategory = !showChangeCategory}}>
        <!-- <p on:click={() => {showChangeCategory = !showChangeCategory}}>{product.title}</p> -->
        <input type="text" id="title" value={product.title} on:change={(event) => {updateTitle(product.id, event.target.value, product.category)}}>
        <div class="stats">
            <div class="quantity">
                <input type="text" id="amount" maxlength="3" value={product.amount} on:input={(event) => {updateAmount(event.target.value, product.id)}}>
                <select value={product.type} on:change={(event) => {updateType(event.target.value, product.id);
                }}>
                    <option value="stk">{wordList.index["pcs"]}</option>
                    <option value="gr">{wordList.index["gr"]}</option>
                    <option value="kg">{wordList.index["kg"]}</option>
                    <option value="ml">{wordList.index["ml"]}</option>
                    <option value="l">{wordList.index["l"]}</option>
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
                    <p>{wordList.categories[category]}</p>
                    <img src="/category/{category}.svg" alt={wordList.categories[category]} title={wordList.categories[category]}>
                </div>
            {/each}
        </div>
    {/if}
</div>

<style>
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
        cursor: pointer;
    }

    #title {
        width:100%;
        outline: none;
        font-size: 1.5rem;
        line-height: 2rem;
        font-weight: 500;
        background-color:var(--primary);
        border: none;
    }

    .quantity {
        display: flex;
    }

    #amount {
        width: 2rem;
        border-radius: .75rem;
        border-top-right-radius: 0;
        border-bottom-right-radius: 0;
        background-color: black;
        color: white;
        border: none;
        padding: .1rem .25rem;
        padding-top: .2rem;
        font-size: 1.1rem;
        line-height: 1.5rem;
    }

    select {
        border: none;
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
    }

    input[type=image] {
        margin-right: auto;
        height: 2rem;
    }

    .changeCategory {
        display: grid;
        grid-template-columns: repeat(3, minmax(0, 1fr));
        border-radius: .75rem;
        margin: 0 .625rem;
        background-color: var(--primary);
        padding: .2rem;
        color: black;
    }
    
    .changeCategory > div {
        margin: .2rem;
        border-radius: .5rem;
        border: 2px solid black;
        cursor: pointer;
    }

    .changeCategory > div > p {
        margin: 0;
        font-size: 1rem;
        line-height: 1.5rem;
        font-weight: 600;
    }

    .changeCategory > div > img {
        height: 2.5rem;
    }
</style>