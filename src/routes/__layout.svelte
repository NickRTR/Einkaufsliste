<script>
    import {user} from "$lib/stores.js";
    import {goto} from '$app/navigation';
    import {browser} from "$app/env";

    if (browser) {
        if ($user === false) {
            goto("/login");
        } else {
            goto("/");
        }
    }
</script>

<body>
    <slot></slot>
</body>

<style>
    * {
        -webkit-appearance:none;
        font-family: Arial, Helvetica, sans-serif;
        margin: 0;
    }
</style>