<script>
    import {handleInput, toggleChecked, deleteProduct} from "../data/firebase.js";
    import products from "../data/store.js";

    import ProductCard from "../components/productCard.svelte"
    import ConnectScreen from "../components/connect.svelte";

    var input = "";

    const addProduct = (i) => {
        handleInput(i);
        input = "";
    } 

    var showConnect = "hidden";

    const toggleLogin = () => {
        if (showConnect == "hidden") {
            showConnect = "";
        } else {
            showConnect = "hidden"
        }
    }
</script>

<svelte:head>
    <title>Einkaufsliste</title>
</svelte:head>

<main class="bg-marine min-h-screen md:px-40 lg:px-64 xl:px-96 text-center">
    <div class="text-center text-bee pb-1">
        <h1 class="text-4xl pt-5 font-semibold">Einkaufsliste</h1>
        <button class="text-white mt-2 mr-4 underline" on:click={toggleLogin}>Liste verbinden</button>
        <div class="{showConnect} bg-marine-bright rounded-xl m-5"><ConnectScreen></ConnectScreen></div>
        <form class="flex my-4 justify-center" on:submit|preventDefault={() => {addProduct(input)}}>
            <input class="m-0 w-3/4 h-8 px-2 bg-bee border-none text-lg text-marine font-semibold rounded-xl" type="text" bind:value={input}>
            <button class="shadow-xl text-lg font-semibold px-2 ml-1.5 bg-bee text-marine rounded-xl" type="submit">Add</button>
        </form>
        <div class="products bg-marine">
            {#each $products as product}
                {#if !product.checked && product.title !== undefined}
                    <ProductCard product={product}/>
                {/if}
            {/each}
        </div>
        <div class="checkedProducts">
            <p class="border-t-2 m-2.5 mt-3"></p>
            {#each $products as product}
                {#if product.checked && product.title !== undefined}
                <ProductCard product={product}/>
                {/if}
            {/each}
        </div>
    </div>
</main>