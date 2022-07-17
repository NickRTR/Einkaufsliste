<script>
    // import { updateTitle, deleteProduct, toggleChecked, changeCategory, updateAmount, updateType } from "$lib/supabaseOld.js";
    import { slide } from "svelte/transition";
    import { error, wordList } from "$lib/stores";
    import { getProducts } from "$lib/api";

    export let product;
    let showChangeCategory = false;

    const categories = ["Gemüse", "Obst", "Vorrat", "Fleisch", "Gefriertruhe", "Kühlregal", "Haushalt", "Süßigkeiten", "Getränke"];

    async function toggleChecked(id, checked) {
        const res = await fetch(`/api/toggleChecked-${id}-${checked}`);
        const data = await res.json();
        
        if (data.error) {
            error.set(data.error);
        }

        await getProducts();
    }

    async function deleteProduct(id) {
        if (confirm($wordList.index.deleteMessage)) {
            const res = await fetch(`/api/deleteProduct-${id}`);
            const data = await res.json();
            
            if (data.error) {
                error.set(data.error);
            }
    
            await getProducts();
        }
    }

    async function editTitle(id, newTitle, category) {
        if (newTitle === product.title || newTitle.trim().length === 0) return;

        const res = await fetch(`/api/editTitle-${id}-${newTitle}-${category}`);
        const data = await res.json();
        
        if (data.error) {
            error.set(data.error);
        }
    }

    async function editAmount(id, amount) {
        if (amount === product.amount || amount.trim().length === 0) return;

        const res = await fetch(`/api/editAmount-${id}-${amount}`);
        const data = await res.json();
        
        if (data.error) {
            error.set(data.error);
        }
    }

    async function editType(id, type) {
        const res = await fetch(`/api/editType-${id}-${type}`);
        const data = await res.json();
        
        if (data.error) {
            error.set(data.error);
        }
    }
</script>
 
<div class="container">
    <div class="Card">
        <div class="ImageTitleQuantity">
            <img type="image" src="/category/{product.category}.svg" alt={$wordList.categories[product.category]} title={$wordList.categories[product.category]} on:click={() => {showChangeCategory = !showChangeCategory}}>
            <div class="TitleAndQuantity">
                <div id="title" contenteditable="true" on:blur={(event) => {
                    editTitle(product.id, event.target.innerText, product.category)}}>{product.title}</div>
                <div class="quantity">
                    <input type="text" class="amount" style="width: 3ch" maxlength="3" value={product.amount} on:blur={(event) => {
                        editAmount(product.id, event.target.value)}}>
                    <select value={product.type} on:change={(event) => {
                        editType(product.id, event.target.value);
                    }}>
                        <option value="stk">{$wordList.index["pcs"]}</option>
                        <option value="gr">{$wordList.index["gr"]}</option>
                        <option value="kg">{$wordList.index["kg"]}</option>
                        <option value="ml">{$wordList.index["ml"]}</option>
                        <option value="l">{$wordList.index["l"]}</option>
                    </select>
                </div>
            </div>
        </div>
        <div class="stats">
            <div class="status">
                <input type="checkbox" bind:checked={product.checked} on:click={async () => {await toggleChecked(product.id, product.checked)}}>
                <input type="image" src="/delete.svg" alt="delete" on:click={() => {deleteProduct(product.id, $wordList.index.deleteMessage)}}>
            </div>
        </div>
    </div>
    {#if showChangeCategory}
        <div class="changeCategory" transition:slide>
            {#each categories as category}
                <div on:click={() => {showChangeCategory = !showChangeCategory; changeCategory(product.title, product.category, category, product.id)}}>
                    <p>{$wordList.categories[category]}</p>
                    <img src="/category/{category}.svg" alt={$wordList.categories[category]} title={$wordList.categories[category]}>
                </div>
            {/each}
        </div>
    {/if}
</div>

<style>
    .Card {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: .375rem;
        margin: .625rem 0;
        border-radius: .75rem;
        word-break: break-word;
        width: 100%;
    }

    .ImageTitleQuantity {
        display: flex;
        width: 100%;
    }

    img {
        height: 3.5rem;
        width: 3.5rem;
        cursor: pointer;
    }

    .TitleAndQuantity {
        margin-inline: .4rem;
        width: 100%;
    }

    #title {
        text-align: left;
        outline: none;
        font-size: 1.3rem;
        line-height: 1.5rem;
        font-weight: 500;
    }

    .quantity {
        display: flex;
    }

    .amount {
        margin: 0;
        outline: none;
        padding: .1rem .25rem;
        padding-left: 0;
        padding-top: .2rem;
        font-size: 1rem;
    }

    select {
        margin: 0;
        padding: .125rem .4rem;
        padding-left: 0;
        border-radius: .5rem;
        border-top-left-radius: 0;
        border-bottom-left-radius: 0;
        font-size: 1.1rem;
        outline: none;
    }

    .amount:hover, .amount:focus, #title:hover, #title:focus, select:hover, select:focus {
        border-color: var(--accent);
    }

    .amount, #title, select {
        border: 3px solid transparent;
        border-radius: 5px;
        transition: .2s ease-in-out all;
    }

    .status {
        display: flex;
        margin-top: .25rem;
        align-items: center;
        margin-left: auto;
    }

    input[type=checkbox] {
        margin-left: auto;
        margin-right: .25rem;
        width: 1.75rem;
        height: 1.75rem;
        outline-color: var(--accent);
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
        padding: .2rem;
        border: 4px solid var(--minor);
    }
    
    .changeCategory > div {
        margin: .2rem;
        border-radius: .5rem;
        cursor: pointer;
    }

    .changeCategory > div:hover p {
        color: var(--accent);
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
