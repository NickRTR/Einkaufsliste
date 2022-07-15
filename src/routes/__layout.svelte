<script>
    import { page } from "$app/stores";
</script>

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
        line-height: 2rem;
    }

    a {
        text-decoration: none;
        cursor: pointer;
        line-height: 0;
        outline: none;
        border-bottom: 4px solid var(--major);
        transition: .2s all ease-in-out;
    }

    a:focus, a:hover {
        border-color: var(--accent);
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
        user-select: none;
    }

    :global(:root) {
        --major: white;
        --minor: black;
        --accent: #0047FF;
    }
</style>