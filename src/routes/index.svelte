<script>
    import { products, user, theme, priorityToCategory } from "$lib/stores.js";
    import { onMount } from "svelte";
    import { slide } from "svelte/transition";
    import { flip } from "svelte/animate";
    import { fade, fly } from 'svelte/transition';
    import { translate } from "$lib/translations/translate";
    import { translation } from "$lib/translations/en";
    import { getProducts, addProduct, logout, getTheme, setTheme, getUserData, changePriorities, deleteAll } from "$lib/supabase.js";

    import ProductCard from "$lib/components/ProductCard.svelte";
    import DragDropList from "$lib/components/DragDropList.svelte";

    let wordList = translation;

    onMount(async () => {
        wordList = await translate(navigator.language);
        getProducts();
        getTheme();
        getUserData();
    });

    let input = "";
    let suggestions = [];
    let showSort = false;

    $: {
        if (input !== "" && $products.length >= 1) {
            let productsTitles = []
            $products.forEach(product => {
                productsTitles = [...productsTitles, product.title];
            });
            suggestions = productsTitles.filter((titles) => {
                return titles.toLowerCase().startsWith(input.toLowerCase());
            })
        } else {
            suggestions = [];
        }
    }

    const shareList = () => {
        let data = "Schoppy\n\n";

        for (let i = 0; i < $products.length; i++) {
            let product = $products[i]
            data += `◯ ${product.title} (${product.amount} ${product.type}) (${wordList.categories[product.category]}) \n`
        }

        if (navigator.share) {
            navigator.share({
                title: `Schoppy - ${wordList.index.share}`,
                text: data
            }).catch(console.error);
        } else {
            alert("Your device/browser isn't able to share this list.");
        }
    }
</script>

<svelte:head>
    <title>Schoppy</title>
</svelte:head>

<body style="--primary: {$theme}">
    <div class="user">
        <h4>{wordList.index.welcome} {$user?.email ? $user.email : ""}!</h4>
        <p on:click={logout}>{wordList.index.logout}</p>
    </div>

    <div class="body">
        <h1 on:click={setTheme}>Schoppy</h1>
        <p class="linkButton" on:click={() => {showSort = !showSort}}>{wordList.index.sort}</p>
        <p class="linkButton" on:click={shareList}>{wordList.index.share}</p>

        {#if showSort}
            <div class="sort" transition:slide|local="{{duration: 800}}">
                <DragDropList bind:data={$priorityToCategory} wordList={wordList.categories} />
                <button class="submitSort" type="submit" on:click|preventDefault={() => {changePriorities($priorityToCategory); showSort = !showSort}}>{wordList.index.sort}</button>
            </div>
        {/if}

        <form class="addProduct" on:submit|preventDefault={() => {addProduct(input); input = "";}}>
            <input type="text" bind:value={input}>
            <button type="submit">{wordList.index.add}</button>
        </form>
        {#each suggestions as suggestion}
            <div class="suggestion" on:click={() => {addProduct(suggestion); input = "";}}>{suggestion}</div>
        {/each}
        <div class="products">
            {#each $products as product (product.id)}
                <div animate:flip in:fade out:fly={{x:100}}>
                    {#if !product.checked}
                        <ProductCard {product} wordList={wordList}/>
                    {/if}
                </div>
            {:else}
                <p>Keine Produkte vorhanden.</p>
            {/each}
        </div>
        <div class="checkedProducts">
            <p class="divider"><span>{wordList.index.checked}</span></p>
            {#each $products as product (product.id)}
                <div in:fade out:fly={{x:100}}>
                    {#if product.checked}
                        <ProductCard {product} wordList={wordList}/>
                    {/if}
                </div>
            {/each}
        </div>
    </div>
    <p class="linkButton" on:click={() => {deleteAll(wordList.index.deleteMessage)}}>{wordList.index.deleteAll}</p>
    <p class="footer">©2022 Nick Reutlinger</p>
</body>

<style>
    body {
        color: var(--primary);
    }

    .user {
        display: flex;
        justify-content: space-between;
        padding: .5rem;
    }

    h4 {
        margin: 0;
        font-weight: normal;
    }

    .user > p {
        margin: 0;
        text-decoration: underline;
        cursor: pointer;
    }

    h1 {
        margin: 0;
        margin-top: .1rem;
        font-size: 2.25rem;
        font-weight: 600;
        cursor: pointer;
    }

    .linkButton {
        margin: 0;
        margin-top: .5rem;
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
    }

    .addProduct {
        display: flex;
        margin-top: 1rem;
        margin-bottom: .5rem;
        justify-content: center;
    }

    input {
        width: 55%;
        height: 2rem;
        padding: 0 .5rem;
        font-size: 1.25rem;
        font-weight: 600;
        border-radius: .75rem;
        border: none;
        background-color: var(--primary);
    }

    form > button {
        font-size: 1.125rem;
        line-height: 1.75rem; font-weight: 600;
        padding: 0 .5rem;
        padding-top: .1rem;
        margin-left: .375rem;
        background-color: var(--primary);
        border-radius: .75rem;
        border: none;
    }

    .suggestion {
        cursor: pointer;
        text-decoration: underline;
        font-size: 1.125rem;
        line-height: 1.5rem; 
    }

    .divider {
        text-align: center; 
        border-bottom: 5px solid red; 
        border-top: 5px solid red;
        border-radius: .5rem;
        line-height: 0;
        margin: 1rem .7rem;
    }

    .divider span {
        background-color: black;
        padding: 0 7px;
    }

    .checkedProducts div {
        filter: opacity(80%);
    }

    .footer {
        margin-top: .5rem;
    }

    @media only screen and (max-width: 600px) {
        body {
            margin: 0;
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