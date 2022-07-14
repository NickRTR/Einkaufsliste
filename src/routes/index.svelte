<script>
    import { products, wordList } from "$lib/stores.js";
    import { onMount } from "svelte";
    import { flip } from "svelte/animate";
    import { fade, fly } from "svelte/transition";
    import { getProducts, addProduct, getUserData } from "$lib/supabase.js";

    import ProductCard from "$lib/components/ProductCard.svelte";

    onMount(async () => {
        getProducts();
        getUserData();
    });

    let input = "";
    let suggestions = [];

    let processedProducts = $products; // if there is something searched, the products are being updated

    // TODO: Improve performance
    // filter products to get suggestions and filtered products
    $: {
        console.time("suggestions and search");
        let preSuggestions = [];
        if (input !== "" && $products.length >= 1) {
            let filteredProducts = [];
            for (let i in $products) {
                let product = $products[i];
                if (product.title.toLowerCase().startsWith(input.toLowerCase()) || product.title.toLowerCase().includes(input.toLocaleLowerCase())) {
                    preSuggestions = [...preSuggestions, product.title];
                    filteredProducts = [...filteredProducts, product];
                }
            }
            // reset suggestions and filtered products
            if (preSuggestions.length === 0) {
                suggestions, processedProducts = [];
            }
            suggestions = preSuggestions;
            if (filteredProducts.length !== 0) processedProducts = filteredProducts; // only filter products if there are some according to the filter
        } else {
            suggestions = [];
            processedProducts = $products;
        }
        console.timeEnd("suggestions and search");
    }
</script>

<svelte:head>
    <title>Schoppy</title>
</svelte:head>

<main>
    <form class="addProduct" on:submit|preventDefault={() => {addProduct(input); input = "";}}>
        <input type="text" bind:value={input} title={$wordList.index.add} placeholder={$wordList.index.placeholder}>
        <button type="submit" title={$wordList.index.add}>{$wordList.index.add}</button>
    </form>
    <div class="suggestions">
        {#each suggestions as suggestion}
            <div class="suggestion" on:click={() => {addProduct(suggestion); input = "";}}>{suggestion}</div>
        {/each}
    </div>

    <div class="products">
        {#each processedProducts as product (product.id)}
            <div animate:flip={{duration: 1000}} in:fade|local out:fly|local={{x:100}}>
                {#if !product.checked}
                    <ProductCard {product}/>
                {/if}
            </div>
        {:else}
            <p>{$wordList.index.noFittingProducts}</p>
        {/each}
    </div>

    <div class="checkedProducts">
        <p class="divider"><span>{$wordList.index.checked}</span></p>
        {#each processedProducts as product (product.id)}
            <div in:fade|local out:fly|local={{x:100}}>
                {#if product.checked}
                    <ProductCard {product}/>
                {/if}
            </div>
        {/each}
    </div>
    
    <footer>
        <p>©2022 Nick Reutlinger</p>
    </footer>
</main>

<style>
    .addProduct {
        display: flex;
        margin-bottom: .5rem;
        justify-content: center;
    }

    input {
        width: 55%;
        height: 2rem;
        padding: 0 .5rem;
        font-size: 1.25rem;
        border-radius: .75rem;
        border: 3px solid var(--minor);
        background-color: var(--major);
        outline: none;
    }

    input:hover, input:focus {
        border-color: var(--accent);
    }

    input::placeholder {
        font-weight: normal;
    }

    form > button {
        font-size: 1.125rem;
        font-weight: bold;
        margin-left: .375rem;
        border-radius: .75rem;
        border: 3px solid var(--accent);
        outline: none;
    }

    form > button:focus, form > button:hover {
        border-color: var(--minor);
    }

    .suggestions {
        max-height: 4rem;
        overflow-y: scroll;
        overscroll-behavior: auto;
    }

    .suggestion {
        cursor: pointer;
        text-decoration: underline;
        font-size: 1.125rem;
        line-height: 1.5rem; 
    }

    .divider {
        text-align: center; 
        border-bottom: 5px solid var(--accent); 
        border-top: 5px solid var(--accent);
        border-radius: .5rem;
        line-height: 0;
        margin: 1rem .7rem;
    }

    .divider span {
        background-color: var(--major);
        padding: 0 7px;
    }

    .checkedProducts div {
        filter: opacity(80%);
    }

    footer {
        margin-top: .5rem;
    }

    /* Scroll Bar */

    /* width */
    ::-webkit-scrollbar {
        width: 15px;
        margin-right: 2.5rem;
    }

    /* Track */
    ::-webkit-scrollbar-track {
        box-shadow: inset 0 0 5px grey;
        border-radius: 7px;
    }

    /* Handle */
    ::-webkit-scrollbar-thumb {
        background: var(--primary);
        border-radius: 7px;
    }
</style>