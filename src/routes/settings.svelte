<script>
    // @ts-nocheck
    import { wordList, session, products, priorityToCategory} from "$lib/stores";
    import { logout, changePriorities, deleteAll, getProducts } from "$lib/supabaseOld";
    import { slide } from "svelte/transition";
    import DragDropList from "$lib/components/DragDropList.svelte";
    import { onMount } from "svelte";
    import { browser } from "$app/env";

    onMount(async () => {
        getProducts();
    });
    
    let showSort = false;
    let language;
    if (browser) {
        language = navigator.language == "en-US" ? "en-US" : navigator.language.substring(0,2);
        if (localStorage.getItem("language")) language = localStorage.getItem("language");
    }

    function changeLanguage() {
        localStorage.setItem("language", language);
        location.reload();
    }

    function shareList() {
        let data = "Schoppy\n\n";

        // alle Produkte der Einkaufsliste zu einer zu teilenden Liste zusammenfassen.
        for (let i = 0; i < $products.length; i++) {
            let product = $products[i]
            if (!product.checked) data += `◯ ${product.title} (${product.amount} ${product.type}) (${$wordList.categories[product.category]}) \n`; // only add if product is unchecked
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
    <div class="language">
        <h2>{$wordList.settings.language.language}: <br></h2>
        <select name="language" id="language" bind:value={language} on:change={changeLanguage}>
            <option value="de">{$wordList.settings.language.German}</option>
            <option value="en">{$wordList.settings.language.English}</option>
            <option value="en-US">{$wordList.settings.language.AmericanEnglish}</option>
            <option value="es">{$wordList.settings.language.Spanish}</option>
            <option value="fr">{$wordList.settings.language.French}</option>
            <option value="zh">{$wordList.settings.language.Chinese}</option>
            <option value="ar">{$wordList.settings.language.Arabic}</option>
        </select>
    </div>

    <div class="list">
        <h2>{$wordList.settings.list}:</h2>
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

    <div class="user">
        <h2>{$session?.user.email ? $session.user.email : ""}</h2>
        <button on:click={logout} title={$wordList.index.logout}>{$wordList.index.logout}</button>
    </div>
</main>

<style>
    button {
        border-radius: 2rem;
        padding: .3em .8rem;
        font-size: 1rem;
        font-weight: bold;
        background-color: var(--accent);
        border: 3px solid var(--accent);
        outline: none;
    }

    button:hover, button:focus {
        border-color: var(--minor);
    }

    select {
        border-radius: 1rem;
        padding: .2rem .5rem;
        font-weight: bold;
    }

    .sort {
        margin: 0 3rem;
        padding: .625rem;
    }

    .list h2 {
        margin-bottom: .8rem;
    }

    .list button {
        margin: .5rem .25rem;
    }
</style>