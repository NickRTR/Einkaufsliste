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

<body class="text-black">
    <slot></slot>
</body>

<style>
    * {
        -webkit-appearance:none;
    }

    @tailwind base;
    @tailwind components;
    @tailwind utilities;
</style>