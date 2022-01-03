<script>
    import {login} from "../data/firebase.js";
    import { browser } from "$app/env";

    $: list = "";
    $: password = "";

    var ListName = "Loading";
    var ListPassword = "Loading";

    if (browser) {
        ListName = localStorage.getItem("list");
        let localStoragePWD = localStorage.getItem("password");
        if (localStoragePWD !== null) {
            ListPassword = localStoragePWD;
        }
    }
</script>

<div class="login pt-2 pb-4 rounded-3xl border-2 border-primary">
    <div class="own text-lg text-primary">
        <p class="text-xl">Eigene Liste</p>
        <p class="m">Name: {ListName} | Passwort: {ListPassword}</p>
    </div>
    <form class="mt-3">
        <input class="h-7 px-2 border-none text-black font-semibold rounded-xl bg-primary" type="text" placeholder="Listenname" bind:value={list}>
        <input class="h-7 mt-1 px-2 border-none text-black font-semibold rounded-xl bg-primary" type="text" placeholder="Passwort" bind:value={password}><br>
        <button class="shadow-xl bg-primary font-semibold px-2 mt-2 ml-1.5 text-black rounded-xl" on:click|preventDefault={() => {login(list, password)}}>Verbinden</button>
    </form>
</div>