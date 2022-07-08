<script>
    import { theme } from "$lib/stores";
    import { onMount } from "svelte";
    import { page } from "$app/stores";
    import { listenToAuthChanges } from "$lib/auth";

    onMount(() => listenToAuthChanges()); // listen to auth state changes to login and logout
</script>

<!-- <body style="--primary: {$theme}"> -->
<body>
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
        color: var(--minor);
        background-color: var(--major);
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
        padding-bottom: .5rem;
        cursor: pointer;
    }

    a {
        text-decoration: none;
        cursor: pointer;
        line-height: 0;
    }

    img {
        border-radius: 100%;
        margin: 0;
        padding: .5rem;
        width: 2.2rem;
        cursor: pointer;
    }

    :global(button) {
        background-color: var(--accent);
        color: var(--major);
        cursor: pointer;
    }

    :global(:root) {
        /* --primary: var(--primary); */
        --major: white;
        --minor: black;
        --accent: #0047FF;
    }
</style>