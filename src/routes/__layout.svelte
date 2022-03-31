<script>
    import { theme, session, wordList } from "$lib/stores";
    import { translate } from "$lib/translations/translate";
    import { goto } from '$app/navigation';
    import { onMount } from "svelte";
    import supabase from "$lib/db";
    import { page } from "$app/stores";

    onMount(async () => {
        // @ts-ignore
        wordList.set(await translate(navigator.language));

        $session = supabase.auth.session();
        supabase.auth.onAuthStateChange((event, authSession) => {
            $session = authSession;
            setTimeout(() => $session ? goto("/") : goto("/login")); // redirect
        })
    })
</script>

<body style="--primary: {$theme}">
    <header>
        <a href="/" sveltekit:prefetch><h1>Schoppy</h1></a>
        <a href={($page.url.pathname === "/settings") ? "/" : "/settings"}><img src="/settings.svg" alt="⚙" title="settings"></a>
    </header>      

    <main><slot></slot></main>
</body>

<style>
    * {
        -webkit-appearance: none;
        font-family: Arial, Helvetica, sans-serif;
        text-align: center;
        color: var(--primary);
        margin: .5rem .75rem;
    }
    
    body {
        max-width: 700px;
        margin: auto;
    }

    header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: .5rem 0;
    }

    h1 {
        margin: 0;
        margin-bottom: .5rem;
        cursor: pointer;
    }

    a {
        text-decoration: none;
        cursor: pointer;
        line-height: 0;
    }

    img {
        background-color: var(--primary);
        border-radius: 100%;
        margin: 0;
        padding: .5rem;
        width: 2.2rem;
        cursor: pointer;
    }

    :global(button) {
        cursor: pointer;
        color: black;
    }

    :global(:root) {
        --primary: var(--primary);
    }
</style>