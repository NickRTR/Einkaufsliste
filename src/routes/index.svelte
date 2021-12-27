<script>
    import {handleInput} from "../data/firebase.js";
    import products from "../data/store.js";

    import ProductCard from "../components/productCard.svelte";
    import ConnectScreen from "../components/connect.svelte";

    var input = "";

    $: {
        getSuggestion(input);
    }

    const addProduct = (i) => {
        handleInput(i);
        input = "";
    } 

    var showConnect = "hidden";

    const toggleLogin = () => {
        if (showConnect == "hidden") {
            showConnect = "";
        } else {
            showConnect = "hidden";
        }
    }

    $: suggestion = "";

    $: getSuggestion = () => {
        if (input != "" && $products.length > 1) {
            for (var i = 0; i < $products.length - 1; i++) {
                var title = $products[i].title;
                if (title.toLowerCase().startsWith(input.toLowerCase())) {
                    suggestion = title;
                }
            }
        } else {
            suggestion = "";
        }
    }
</script>

<svelte:head>
    <title>Einkaufsliste</title>
</svelte:head>

<main class="bg-marine min-h-screen text-center md:px-40 lg:px-64 xl:px-96">
    <div class="text-bee pb-1">
        <h1 class="text-4xl pt-5 font-semibold">Einkaufsliste</h1>
        <div>
            <button class="text-white mt-2 underline" on:click={toggleLogin}>Liste verbinden</button><br>
            <div class="{showConnect} bg-marine-bright rounded-xl mt-3"><ConnectScreen></ConnectScreen></div>
            <button class="text-white mt-2 underline" on:click={() => {localStorage.clear(); location.reload()}}>Neue Liste</button>
        </div>
        <form class="flex mt-4 mb-2 justify-center" on:submit|preventDefault={() => {addProduct(input)}}>
            <input class="m-0 w-3/4 h-8 px-2 bg-bee border-none text-lg text-marine font-semibold rounded-xl" type="text" bind:value={input}>
            <button class="shadow-xl text-lg font-semibold px-2 ml-1.5 bg-bee text-marine rounded-xl" type="submit">Add</button>
        </form>
        <div class="suggestion cursor-pointer underline text-xl" on:click={() => {addProduct(suggestion)}}>{suggestion}</div>
        <div class="products">
            {#each $products as product}
                {#if !product.checked && product.title !== undefined}
                    <ProductCard product={product}/>
                {/if}
            {/each}
        </div>
        <div class="checkedProducts">
            <p class="divider border-t-2 border-white mx-2.5 mt-2.5"></p>
            {#each $products as product}
                {#if product.checked && product.title !== undefined}
                <ProductCard product={product}/>
                {/if}
            {/each}
        </div>
    </div>
    <p class="text-white">©2022 Nick Reutlinger</p>
</main>