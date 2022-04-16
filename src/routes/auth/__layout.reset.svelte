<script>
    import { onMount } from "svelte";
    import { listenToAuthChanges } from "$lib/auth";

    onMount(() => listenToAuthChanges()); // listen to auth state changes to login and logout
</script>

<body>
    <slot></slot>
</body>

<style>
    * {
        -webkit-appearance: none;
        font-family: Arial, Helvetica, sans-serif;
        text-align: center;
        color: white;
        margin: .5rem .75rem;
    }
    
    body {
        max-width: 700px;
        margin: auto;
    }
</style>