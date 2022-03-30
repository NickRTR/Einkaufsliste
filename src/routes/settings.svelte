<script>
    import { wordList, session, products, priorityToCategory} from "$lib/stores";
    import { logout, changePriorities, deleteAll, setTheme } from "$lib/supabase";
    import { slide } from "svelte/transition";
    import DragDropList from "$lib/components/DragDropList.svelte";
    
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
    <h2>Authentication</h2>
    <div class="user">
        <h4>{$wordList.index.welcome} {$session?.user.email ? $session.user.email : ""}!</h4>
        <p on:click={logout}>{$wordList.index.logout}</p>
    </div>
    
    <hr>

    <h2>Theme</h2>
    <p on:click={setTheme}>Change Theme</p>

    <hr>
    
    <h2>List</h2>
    <h3>Share List</h3>
    <p class="linkButton" on:click={shareList}>{$wordList.index.share}</p>

    <h3>Sort Categories</h3>
    <p class="linkButton" on:click={() => {showSort = !showSort}}>{$wordList.index.sort}</p>
    {#if showSort}
        <div class="sort" transition:slide|local="{{duration: 800}}">
            <DragDropList bind:data={$priorityToCategory} wordList={$wordList.categories} />
            <button class="submitSort" type="submit" on:click|preventDefault={() => {changePriorities($priorityToCategory); showSort = !showSort}}>{$wordList.index.sort}</button>
        </div>
    {/if}

    <h3>Manage Products</h3>
    <p class="linkButton" on:click={() => {deleteAll($wordList.index.deleteMessage)}}>{$wordList.index.deleteAll}</p>
</main>

<style>
    main {
        color: var(--primary);
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

    .linkButton {
        margin: 0;
        margin-top: .5rem;
        text-decoration: underline;
        cursor: pointer;
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
</style>