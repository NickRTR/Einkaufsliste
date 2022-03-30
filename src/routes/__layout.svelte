<script>
    import { theme } from "$lib/stores";
    import { goto } from '$app/navigation';
    import { onMount } from "svelte";
    import { session } from "$lib/stores";
    import supabase from "$lib/db";

    onMount(() => {
        $session = supabase.auth.session();
        supabase.auth.onAuthStateChange((event, authSession) => {
            $session = authSession;
            setTimeout(() => $session ? goto("/") : goto("/login")); // redirect
        })
    })
</script>

<body style="--primary: {$theme}">
    <slot></slot>
</body>

<style>
    * {
        -webkit-appearance: none;
        font-family: Arial, Helvetica, sans-serif;
        text-align: center;
        color: white;
        margin: .5rem .25rem;
    }

    :global(button) {
        cursor: pointer;
        color: black;
    }

    :global(:root) {
        --primary: var(--primary);
    }
</style>