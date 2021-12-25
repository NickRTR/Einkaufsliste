<script>
    import {login} from "../data/firebase.js";
    import { browser } from "$app/env";

    $: list = "";
    $: password = "";

    var ListName = "Loading";
    var ListPassword = "Loading"

    if (browser) {
        ListName = localStorage.getItem("list");
        ListPassword = localStorage.getItem("password");
    }
</script>

<div class="login pt-2 pb-4">
    <div class="own text-lg text-white">
        <p class="text-xl text-bee">Eigene Liste</p>
        <p class="m">Name: {ListName} | Passwort: {ListPassword}</p>
    </div>
    <form class="mt-3">
        <input class="h-7 px-2 bg-bee border-none text-marine font-semibold rounded-xl placeholder-marine-bright" type="text" placeholder="Listenname" bind:value={list}>
        <input class="h-7 mt-1 px-2 bg-bee border-none text-marine font-semibold rounded-xl placeholder-marine-bright" type="text" placeholder="Passwort" bind:value={password}><br>
        <button class="shadow-xl font-semibold px-2 mt-2 ml-1.5 bg-bee text-marine rounded-xl" on:click|preventDefault={() => {login(list, password)}}>Verbinden</button>
    </form>
</div>