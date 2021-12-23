<script>
    import products from "../data/store.js";
    import {login} from "../data/firebase.js";
    import { browser } from "$app/env";

    $: list = "";
    $: password = "";

    var ListName = "Loading";

    if (browser) {
        ListName = localStorage.getItem("list");
    }
</script>

<div class="login">
    <form>
        <div class="own text-lg text-white">
            <p class="text-xl text-bee">Eigene Liste</p>
            <p>Listenname: {ListName}</p>
            <p class="mb-2">Passwort: 1234</p>
        </div>
        <input class="h-7 px-2 bg-bee border-none text-marine font-semibold rounded-xl placeholder-marine-bright" type="text" placeholder="Listenname" bind:value={list}>
        <input class="h-7 px-2 bg-bee border-none text-marine font-semibold rounded-xl placeholder-marine-bright" type="text" placeholder="Passwort" bind:value={password}><br>
        <button class="shadow-xl font-semibold px-2 mt-2 ml-1.5 bg-bee text-marine rounded-xl" on:click|preventDefault={() => {login(list, password)}}>Verbinden</button>
    </form>
</div>