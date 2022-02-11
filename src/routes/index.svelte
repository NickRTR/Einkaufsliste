<script>
    import {products, user, theme, priorityToCategory} from "$lib/stores.js";
    import {onMount} from "svelte";
    import {getProducts, addProduct, logout, setTheme, changePriorities} from "$lib/supabase.js";

    import ProductCard from "$lib/components/productCard.svelte";
    import DragDropList from "$lib/components/DragDropList.svelte";

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

    // white, lightpink, purple, babyblue, babygreen, orange
    const colors = ["#EEE", "#F2CCC3", "#B7D3F2", "#a1c181", "#e9c46a"];
    $: primaryColor = colors[$theme];

    const changePrimary = () => {
        let currentColor = $theme;
        currentColor++;
        if (currentColor == colors.length) {
            currentColor = 0;
        }
        setTheme(currentColor, $user.id);
    }

    let priorities = $priorityToCategory;

    $: if ($priorityToCategory !== undefined && priorities === undefined) {
        priorities = $priorityToCategory;
    }
</script>

<svelte:head>
    <title>Schoppy-Einkaufsliste</title>
</svelte:head>

<body style="--primary: {primaryColor}">
    <div class="user">
        <h4>Willkommen {$user?.email ? $user.email : ""}!</h4>
        <p on:click={logout}>logout</p>
    </div>

    <div class="body">
        <h1 on:click={() => {changePrimary()}}>Einkaufsliste</h1>
        <p class="showSort" on:click={() => {showSort = !showSort}}>Kategorien sortieren</p>

        {#if showSort}
            <div class="sort">
                <DragDropList bind:data={priorities}/>
                <button class="submitSort" type="submit" on:click|preventDefault={() => {changePriorities(priorities); showSort = !showSort}}>Sortierung anpassen</button>
            </div>
        {/if}

        <form class="addProduct" on:submit|preventDefault={() => {addProduct(input); input = "";}}>
            <input type="text" bind:value={input}>
            <button type="submit">Add</button>
        </form>
        {#each suggestions as suggestion}
            <div class="suggestion" on:click={() => {addProduct(suggestion); input = "";}}>{suggestion}</div>
        {/each}
        <div class="products">
            {#each $products as product}
                {#if !product.checked}
                    <ProductCard {product}/>
                {/if}
            {:else}
            <p>Keine Produkte vorhanden.</p>
            {/each}
        </div>
        <div class="checkedProducts">
            <p class="divider"></p>
            {#each $products as product}
                {#if product.checked}
                    <ProductCard {product}/>
                {/if}
            {/each}
        </div>
    </div>
    <p class="footer">©2022 Nick Reutlinger</p>
</body>

<style>
    :global(:root) {
        --primary: primaryColor;
    }

    body {
        background-color: black;
        text-align: center;
        color: var(--primary);
    }

    .user {
        display: flex;
    }

    h4 {
        margin: 0;
        margin-top: .5rem;
        margin-left: .5rem;
        font-weight: 400;
    }

    .user > p {
        margin-top: .5rem;
        margin-left: auto;
        margin-right: .5rem;
        text-decoration: underline;
        cursor: pointer;
    }

    h1 {
        margin: 0;
        margin-top: .1rem;
        font-size: 2.25rem;
        line-height: 2.5rem;
        font-weight: 600;
        cursor: pointer;
    }

    .showSort {
        margin: .4rem 0;
        background-color: black;
        color: var(--primary);
        text-decoration: underline;
        cursor: pointer;
    }

    .sort {
        background-color: var(--primary);
        margin: 0 3rem;
        padding: .625rem;
        border-radius: 1rem;
    }

    .submitSort {
        margin-top: .5rem;
        font-size: 1.1rem;
        line-height: 1.75rem; 
        font-weight: 600;
        background-color: black;
        color: var(--primary);
        border-radius: .75rem;
        border: none;
        cursor: pointer;
    }

    .addProduct {
        display: flex;
        margin-top: 1rem;
        margin-bottom: .5rem;
        justify-content: center;
    }

    input {
        margin: 0;
        width: 75%;
        height: 2rem;
        padding: 0 .5rem;
        padding-top: .2rem;
        color: black;
        font-size: 1.125rem;
        line-height: 1.75rem;
        font-weight: 600;
        border-radius: .75rem;
        border: none;
        background-color: var(--primary);
    }

    form > button {
        font-size: 1.125rem;
        line-height: 1.75rem; 
        font-weight: 600;
        padding: 0 .5rem;
        padding-top: .1rem;
        margin-left: .375rem;
        background-color: var(--primary);
        color: black;
        border-radius: .75rem;
        border: none;
    }

    .suggestion {
        cursor: pointer;
        text-decoration: underline;
        font-size: 1.125rem;
        line-height: 1.75rem; 
    }

    .divider {
        border-top: 2px solid var(--primary);
        margin: .6rem;
    }

    @media only screen and (max-width: 600px) {
        body {
            margin: 0 ;
        }
    }

    @media (min-width: 768px) {
        body {
            margin: 0 10rem;
        }
    }

    @media (min-width: 1024px) {
        body {
            margin: 0 16rem;
        }
    }
    
    @media (min-width: 1280px) {
        body {
            margin: 0 24rem;
        }
    }
</style>