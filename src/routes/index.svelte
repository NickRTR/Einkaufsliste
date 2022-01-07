<script>
    import {products, user, theme, priorityToCategory} from "$lib/stores.js";
    import {onMount} from "svelte";
    import {getProducts, addProduct, logout, setTheme} from "$lib/supabase.js";

    import ProductCard from "$lib/components/productCard.svelte";

    onMount(() => {
        getProducts();
    });

    let input = "";
    let suggestions = [];
    let showSort = false;

    $: {
        if (input !== "" && $products.length >= 1) {
            let productsTitles = []
            for (let i = 0; i <= $products.length - 1; i++) {
                productsTitles = [...productsTitles, $products[i].title];
            }
            suggestions = productsTitles.filter((titles) => {
                return titles.toLowerCase().startsWith(input.toLowerCase());
            })
        } else {
            suggestions = [];
        }
    }

    let priorities = Object.values($priorityToCategory);

    // Weiß, lightpink, purple, babyblue, babygreen, orange
    $: primaryColor = colors[$theme];

    const colors = ["#EEE", "#F2CCC3", "#B7D3F2", "#a1c181", "#e9c46a"];

    const changePrimary = () => {
        let currentColor = $theme;
        currentColor++;
        if (currentColor == colors.length) {
            currentColor = 0;
        }
        setTheme(currentColor, $user.id);
    }
</script>

<svelte:head>
    <title>Einkaufsliste</title>
</svelte:head>

<main class="bg-black min-h-screen text-center md:px-40 lg:px-64 xl:px-96" style="--primary: {primaryColor}">
    <div class="user text-primary flex">
        <h4 class="pt-2 pl-2">Willkommen {$user?.email ? $user.email : ""}!</h4>
        <button class="ml-auto underline pt-2 pr-2" on:click={logout}>logout</button>
    </div>

    <div class="pb-1">
        <h1 class="text-4xl pt-4 text-primary font-semibold cursor-pointer" on:click={() => {changePrimary()}}>Einkaufsliste</h1>
        <button class="text-primary underline pt-2" on:click={() => {showSort = !showSort}}>Kategorien sortieren</button>

        {#if showSort}
            <div class="sort bg-primary text-black grid grid-cols-3 justify-center rounded-xl mx-2.5 mt-1 p-1 pb-0">
                {#each priorities as category}
                    <div class="border-b-2 border-black">
                        <p class="my-auto text-lg font-semibold break-all">{category}</p>
                        <img class="h-10 w-10 mb-1 mx-auto" src="/category/{category}.svg" alt={category} title={category}>
                    </div>
                {/each}
            </div>
        {/if}

        <form class="flex mt-4 mb-2 justify-center" on:submit|preventDefault={() => {addProduct(input); input = "";}}>
            <input class="m-0 w-3/4 h-8 px-2 bg-primary border-none text-lg text-black font-semibold rounded-xl" type="text" bind:value={input}>
            <button class="shadow-xl text-lg font-semibold px-2 ml-1.5 bg-primary text-black rounded-xl" type="submit">Add</button>
        </form>
        {#each suggestions as suggestion}
            <div class="suggestion cursor-pointer underline text-lg text-primary" on:click={() => {addProduct(suggestion); input = "";}}>{suggestion}</div>
        {/each}
        <div class="products">
            {#each $products as product}
                {#if !product.checked && product.title !== undefined}
                    <ProductCard product={product}/>
                {/if}
            {:else}
            <p class="text-primary">Keine Produkte vorhanden.</p>
            {/each}
        </div>
        <div class="checkedProducts">
            <p class="divider border-t-2 border-primary mx-2.5 mt-2.5"></p>
            {#each $products as product}
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