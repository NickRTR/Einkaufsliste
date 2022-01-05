<script>
    import {products, user} from "$lib/stores.js";
    import {onMount} from "svelte";
    import {getProducts, addProduct, logout} from "$lib/data/supabase.js";

    import ProductCard from "$lib/components/productCard.svelte";
    import ConnectScreen from "$lib/components/connect.svelte";

    onMount(async () => {
        await getProducts();
    })

    var input = "";

    $: {
        getSuggestion(input);
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

    const getSuggestion = () => {
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

    // Weiß, lightpink, purple, babyblue, babygreen, orange
    const colors = ["#EEE", "#F2CCC3", "#B7D3F2", "#a1c181", "#e9c46a"];
    var currentColor = 0;
    var primaryColor = "#EEE";

    const changePrimary = () => {
        currentColor++;
        if (currentColor == colors.length) {
            currentColor = 0;
        }
        primaryColor = colors[currentColor];
    }
</script>

<svelte:head>
    <title>Einkaufsliste</title>
</svelte:head>

<main class="bg-black min-h-screen text-center md:px-40 lg:px-64 xl:px-96" style="--primary: {primaryColor}">
    <div class="user text-primary flex">
        <h4 class="pt-2 pl-2">Willkommen {$user?.email ? $user.email : ""}!</h4>
        <button class="ml-auto pt-2 pr-2" on:click={logout}>logout</button>
    </div>

    <div class="pb-1">
        <h1 class="text-4xl pt-5 text-primary font-semibold cursor-pointer" on:click={changePrimary}>Einkaufsliste</h1>
        <div>
            <button class="text-primary md:text-lg mt-2 underline" on:click={toggleLogin}>Liste verbinden</button><br>
            <div class="{showConnect} rounded-xl mt-3 mx-2.5"><ConnectScreen></ConnectScreen></div>
            <button class="text-primary md:text-lg mt-2 underline" on:click={() => {localStorage.clear(); location.reload()}}>Neue Liste</button>
        </div>
        <form class="flex mt-4 mb-2 justify-center" on:submit|preventDefault={() => {addProduct(input, $user.id); input = "";}}>
            <input class="m-0 w-3/4 h-8 px-2 bg-primary border-none text-lg text-black font-semibold rounded-xl" type="text" bind:value={input}>
            <button class="shadow-xl text-lg font-semibold px-2 ml-1.5 bg-primary text-black rounded-xl" type="submit">Add</button>
        </form>
        <div class="suggestion cursor-pointer underline text-lg text-primary" on:click={() => {addProduct(suggestion, $user.id)}}>{suggestion}</div>
        <div class="products">
            {#each $products.reverse() as product}
                {#if !product.checked && product.title !== undefined}
                    <ProductCard product={product}/>
                {/if}
            {:else}
            <p class="text-primary">Keine Produkte vorhanden.</p>
            {/each}
        </div>
        <div class="checkedProducts">
            <p class="divider border-t-2 border-primary mx-2.5 mt-2.5"></p>
            {#each $products.reverse() as product}
                {#if product.checked && product.title !== undefined}
                <ProductCard product={product}/>
                {/if}
            {/each}
        </div>
    </div>
    <p class="text-primary">©2022 Nick Reutlinger</p>
</main>

<style>
    :root {
        --primary: primaryColor;
    }
</style>