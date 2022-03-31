<script>
    // @ts-nocheck
    import { wordList, session, products, priorityToCategory} from "$lib/stores";
    import { logout, changePriorities, deleteAll, setTheme, getTheme, getProducts } from "$lib/supabase";
    import { slide } from "svelte/transition";
    import DragDropList from "$lib/components/DragDropList.svelte";
    import { onMount } from "svelte";

    onMount(async () => {
        getProducts();
        getTheme();
    });
    
    let showSort = false;

    const shareList = () => {
        let data = "Schoppy\n\n";

        for (let i = 0; i < $products.length; i++) {
            let product = $products[i]
            data += `◯ ${product.title} (${product.amount} ${product.type}) (${$wordList.categories[product.category]}) \n`
        }

        if (navigator.share) {
            navigator.share({
                title: `Schoppy - ${$wordList.index.share}`,
                text: data
            }).catch(console.error);
        } else {
            alert("Your device/browser isn't able to share this list.");
        }
    }
</script>

<main>
    <div class="general">
        <div class="theme" title={$wordList.settings.changeTheme} on:click={setTheme}>
            <p>{$wordList.settings.theme}</p>
        </div>
        <div class="user">
            <h3>{$session?.user.email ? $session.user.email : ""}</h3>
            <button on:click={logout} title={$wordList.index.logout}>{$wordList.index.logout}</button>
        </div>
    </div>

    <div class="list">
        <h2>{$wordList.settings.list}</h2>
        <button on:click={shareList} title={$wordList.index.share}>{$wordList.index.share}</button>
        <button on:click={() => {deleteAll($wordList.index.deleteMessage)}} title={$wordList.index.deleteAll}>{$wordList.index.deleteAll}</button>
        <br>
        <button id="sortButton" on:click={() => {showSort = !showSort}} title={$wordList.index.sort}>{$wordList.index.sort}</button>
        {#if showSort}
            <div class="sort" transition:slide|local="{{duration: 800}}">
                <DragDropList bind:data={$priorityToCategory} wordList={$wordList.categories} />
                <button class="submitSort" type="submit" on:click|preventDefault={() => {changePriorities($priorityToCategory); showSort = !showSort}}>{$wordList.index.sort}</button>
            </div>
        {/if}
    </div>

</main>

<style>
    main {
        color: var(--primary);
    }

    button {
        border-radius: 2rem;
        border: none;
        padding: .5rem 1rem;
        font-size: 1rem;
        font-weight: bold;
        background-color: var(--primary);
    }

    .general {
        display: flex;
        justify-content: space-around;
        align-items: center;
    }

    .theme {
        background-color: var(--primary);
        color: black;
        width: 10rem;
        height: 10rem;
        border-radius: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        font-size: 2rem;
        font-weight: bold;
    }

    .sort {
        background-color: var(--primary);
        margin: 0 3rem;
        margin-top: .5rem;
        padding: .625rem;
        border-radius: 1rem;
    }

    .submitSort {
        margin-top: .5rem;
        font-size: 1.1rem;
        line-height: 1.75rem; 
        font-weight: 600;
        background-color: black;
        border-radius: .75rem;
        border: none;
        color: var(--primary);
    }

    .list {
        margin: 0 1rem;
        margin-top: 2rem;
        border-top: 5px solid var(--primary);
    }

    .list h2 {
        margin-bottom: 1rem;
    }

    .list button {
        margin: .5rem .25rem;
    }

    @media only screen and (max-width: 400px) {
        .theme {
            width: 7rem;
            height: 7rem;
            font-size: 1.5rem;
        }
    }

    @media only screen and (max-width: 330px) {
        .theme {
            width: 6rem;
            height: 6rem;
            font-size: 1.2rem;
        }
    }
</style>