<script>
import {handleInput, toggleChecked, deleteProduct, shareList} from "../data/firebase.js";
import products from "../data/store.js";

var input = "";
var currentList = shareList();

const addProduct = (i) => {
    handleInput(i);
    input = "";
} 
</script>

<svelte:head>
    <title>Einkaufsliste</title>
</svelte:head>

<main class="bg-marine min-h-screen md:px-40 lg:px-64 xl:px-96 text-center">
    <div class="text-center text-bee pb-1">
        <h1 class="text-4xl pt-5 font-semibold">Einkaufsliste {currentList}</h1>
        <button class="text-white my-2 mr-4 underline" on:click={shareList}>Liste teilen</button>
        <form class="flex mb-4 mt-1 justify-center" on:submit|preventDefault={() => {addProduct(input)}}>
            <input class="m-0 w-3/4 h-8 px-2 bg-bee border-none text-lg text-marine font-semibold rounded-xl" type="text" bind:value={input}>
            <button class="text-lg font-semibold px-2 ml-1.5 bg-bee text-marine rounded-xl" type="submit">Add</button>
        </form>
        <div class="products bg-marine">
            {#each $products as product}
                {#if !product.checked}
                    <div class="Card text-2xl text-left p-1.5 m-2.5 bg-marine-bright rounded-xl break-words flex items-center">
                        <img class="h-10 w-10 mr-1.5 text-xs" type="image" src="/category/{product.category}.svg" alt={product.category}>
                        <p on:click={() => {toggleChecked(product.id, product.checked)}}>{product.title}</p>
                        <input class="ml-auto mr-1 w-6 h-6" type="checkbox" checked={product.checked} on:click={() => {toggleChecked(product.id, product.created, product.checked)}}>
                        <input class="mt-0.5 h-7 w-7 text-xs" type="image" src="/delete.svg" alt="delete" on:click={() => {deleteProduct(product.id)}}>
                    </div>
                {/if}
            {/each}
        </div>
        <div class="checkedProducts">
            <p class="border-t-2 m-2.5 mt-3"></p>
            {#each $products as product}
                {#if product.checked}
                    <div class="checkedCard text-2xl text-left p-1.5 m-2.5 bg-marine-bright rounded-xl break-words flex items-center">
                        <input class="h-10 w-10 mr-1.5" type="image" src="/category/{product.category}.svg" alt="(delete)">
                        <p on:click={() => {toggleChecked(product.id, product.created, product.checked)}}>{product.title}</p>
                        <input class="ml-auto mr-1 w-6 h-6" type="checkbox" checked={product.checked} on:click={() => {toggleChecked(product.id, product.created, product.checked)}}>
                        <input class="mt-0.5 h-7 w-7 text-xs" type="image" src="/delete.svg" alt="delete" on:click={() => {deleteProduct(product.id)}}>
                    </div>
                {/if}
            {/each}
        </div>
    </div>
</main>