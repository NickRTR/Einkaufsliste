<script>
    import {deleteProduct, toggleChecked, changeCategory, updateQuantity} from "$lib/supabase.js";
    import {priorityToCategory} from "$lib/stores.js";

    export let product;
    let showChangeCategory = false;

    $: updateAmount(product.amount);
    $: updateType(product.type);

    const updateAmount = (updatedAmount) => {
        amount = updatedAmount;
    }

    const updateType = (updatedType) => {
        type = updatedType;
    }

    let amount = product.amount;
    let type = product.type;

    $: checkInput(amount);
    $: getSelection(type);

    const checkInput = (input) => {
        if (/^\d+$/.test(input)) {
            amount = input;
        } else if (input == "") {
            amount = 1;
        } else {
            input = input.toString();
            amount = input.substring(0, input.length - 1);
        }
    }

    const getSelection = (type) => {
        if (type != product.type) {
            updateQuantity(amount, type, product.id);
        }
    }

    const categories = ["Vorrat", "Gemüse", "Obst", "Kühlregal", "Gefriertruhe", "Fleisch", "Süßigkeiten", "Haushalt", "Getränke"];

    let category;
    $: if (product.category === 0) {
        category = 0;
    } else {
        category = $priorityToCategory[product.category];
    }
</script>
 
<div class="container">
    <div class="Card">
        <img type="image" src="/category/{category}.svg" alt={category} title={category} on:click={() => {showChangeCategory = !showChangeCategory}}>
        <p on:click={() => {showChangeCategory = !showChangeCategory}}>{product.title}</p>
        <div class="stats">
            <div class="quantity">
                <input type="text" maxlength="3" bind:value={amount} on:input={() => {updateQuantity(amount, type, product.id)}}>
                <select bind:value={type}>
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
        font-size: 1.1rem;
        line-height: 1.5rem;
        border: 1px solid black;
    }

    select {
        padding: .125rem 0;
        padding-right: .4rem;
        border-radius: .5rem;
        border-top-left-radius: 0;
        border-bottom-left-radius: 0;
        background-color: black;
        color: white;
        font-size: 1.1rem;
        border: 1px solid black;
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