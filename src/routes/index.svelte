<script context="module">
    import { products } from "$lib/stores";
    import { getProducts } from "$lib/api";

    export async function load({ session, fetch }) {
        if (!session.user) {
            return {
                status: 302,
                redirect: "/auth/login"
            }
        }

        await getProducts(fetch);

        return {
            status: 200
        }
    }
</script>

<script>
    import { wordList } from "$lib/stores.js";
    import { toast } from "@zerodevx/svelte-toast";
    import { flip } from "svelte/animate";
    import { fade, fly } from "svelte/transition";

    import ProductCard from "$lib/components/ProductCard.svelte";

    let input = "";

    $: processedProducts = $products;

    async function processInput() {
        if (input === "" || $products.length === 0) {
            processedProducts = $products;
            return;
        } else {
            const res = await fetch("/api/filterProducts-" + input);
            const data = await res.json();
    
            if (data.error) {
                toast.push(error);
            } else {
                processedProducts = data.filteredProducts;
            }
        }
    }

    async function addProduct() {
        // check if string is empty
        input = input.trim();
        if (input.length !== 0) {
            const res = await fetch(`/api/addProduct-${input}-${category}`);
            const data = await res.json();

            if (data.error) {
                toast.push(error);
            }

            input = "";
        }
        await getProducts();
    }
</script>

<svelte:head>
    <title>Schoppy</title>
</svelte:head>

<main>
    <form class="addProduct" on:submit|preventDefault={async () => {await addProduct(input); input = ""}}>
        <input type="text" bind:value={input} title={$wordList.index.add} placeholder={$wordList.index.placeholder} on:input={processInput}>
        <button type="submit" title={$wordList.index.add}>{$wordList.index.add}</button>
    </form>

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