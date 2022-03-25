<script>
    import { user, theme } from "$lib/stores.js";
    import { goto } from '$app/navigation';
    import { browser } from "$app/env";

    if (browser) {
        if ($user === false) {
            goto("/login");
        }
    }
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
    }

    :global(button) {
        cursor: pointer;
        color: black;
    }

    :global(:root) {
        --primary: var(--primary);
    }
</style>