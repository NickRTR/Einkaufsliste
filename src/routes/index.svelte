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

<body style="--primary: {primaryColor}">
    <div class="user">
        <h4>Willkommen {$user?.email ? $user.email : ""}!</h4>
        <button on:click={logout}>logout</button>
    </div>

    <div class="body">
        <h1 on:click={() => {changePrimary()}}>Einkaufsliste</h1>
        <button class="showSort" on:click={() => {showSort = !showSort}}>Kategorien sortieren</button>

        {#if showSort}
            <div class="sort">
                {#each priorities as category}
                    <div>
                        <p>{category}</p>
                        <img src="/category/{category}.svg" alt={category} title={category}>
                    </div>
                {/each}
            </div>
        {/if}

        <form on:submit|preventDefault={() => {addProduct(input); input = "";}}>
            <input type="text" bind:value={input}>
            <button type="submit">Add</button>
        </form>
        {#each suggestions as suggestion}
            <div class="suggestion" on:click={() => {addProduct(suggestion); input = "";}}>{suggestion}</div>
        {/each}
        <div class="products">
            {#each $products as product}
                {#if !product.checked && product.title !== undefined}
                    <ProductCard product={product}/>
                {/if}
            {:else}
            <p>Keine Produkte vorhanden.</p>
            {/each}
        </div>
        <div class="checkedProducts">
            <p class="divider"></p>
            {#each $products as product}
                {#if product.checked && product.title !== undefined}
                    <ProductCard product={product}/>
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
        padding-top: .5rem;
        padding-left: .5rem;
    }

    .user > button {
        margin-left: auto;
        text-decoration: underline;
        padding-top: .5rem;
        padding-right: .5rem;
    }

    h1 {
        font-size: 2.25rem;
        line-height: 2.5rem;
        padding-top: 1rem;
        font-weight: 600;
        cursor: pointer;
    }

    .showSort {
        text-decoration: underline;
        padding-top: .5rem;
    }

    .sort {
        background-color: var(--primary);
        color: black;
        display: grid;
        grid-template-columns: repeat(3, minmax(0, 1fr));
        justify-content: center;
        border-radius: .75rem;
        margin: 0 .625rem;
        margin-top: .25rem;
        padding: .2rem;
    }

    .sort > div {
        margin: .2rem;
        border-radius: .5rem;
        border: 2px solid black;
    }

    .sort > div > p {
        font-size: 1.125rem;
        line-height: 1.75rem;
        font-weight: 600;
    }

    .sort > div > img {
        height: 2.5rem;
        margin: 0 auto;
        margin-bottom: .25rem;
    }

    form {
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
        color: black;
        font-size: 1.125rem;
        line-height: 1.75rem;
        font-weight: 600;
        border-radius: .75rem;
    }

    form > button {
        font-size: 1.125rem;
        line-height: 1.75rem; 
        font-weight: 600;
        padding: 0 .5rem;
        margin-left: .375rem;
        background-color: var(--primary);
        color: black;
        border-radius: .75rem;
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