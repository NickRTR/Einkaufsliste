<script>
    import {goto} from "$app/navigation";
    import supabase from "$lib/db.js";
    import {user} from "$lib/stores.js";
    import {createUserData} from "$lib/supabase.js";

    let emailInput = "";
    let passwordInput = "";

    let isNewRegistration = false;

    const signUp = async () => {
        let { user: userDetails, error } = await supabase.auth.signUp({
            email: emailInput,
            password: passwordInput,
        });
        if (error) {
            console.log(error);
            alert(error.message);
        } else {
            $user = userDetails;
            createUserData($user.id);
            goto("/");
        }
    }

    const logIn = async () => {
        let { user: userDetails, error } = await supabase.auth.signIn({
            email: emailInput,
            password: passwordInput,
        });
        if (error) {
            console.log(error);
            alert(error.message);
        } else {
            $user = userDetails;
            goto("/");
        }
    }
</script>

<body class="bg-black min-h-screen text-center md:px-40 lg:px-64 xl:px-96 text-primary" style="--primary: #EEE">
    {#if isNewRegistration}
        <h1 class="text-4xl pt-5 text-primary font-semibold cursor-pointer" on:click={() => {isNewRegistration = !isNewRegistration}}>Registrieren</h1>
    {:else}
        <h1 class="text-4xl pt-5 text-primary font-semibold cursor-pointer" on:click={() => {isNewRegistration = !isNewRegistration}}>Login</h1>
    {/if}
    

    <form class="mx-10 rounded-2xl mt-6 text-primary text-xl mb-2 justify-center" on:submit|preventDefault>
        <label class="font-semibold text-xl" for="email">E-mail: </label><br>
        <input class="h-8 px-2 my-2 bg-primary text-black font-semibold rounded-xl" type="email" id="email" placeholder="email@email.com" bind:value={emailInput}><br>
        <label class="font-semibold text-xl" for="password">password: </label><br>
        <input class="h-8 px-2 my-2 bg-primary text-black font-semibold rounded-xl" type="password" id="password" placeholder="password" bind:value={passwordInput}><br>

        {#if isNewRegistration}
            <button class="shadow-xl text-xl font-semibold px-2 h-8 pb-0.5 mt-2 ml-1.5 bg-primary text-black rounded-2xl" on:click={signUp}>signup</button>
            <p class="switchMethod mb-2 mt-1 cursor-pointer underline" on:click={() => {isNewRegistration = !isNewRegistration}}>Besitzt du schon einen Account?</p>
        {:else}
            <button class="shadow-xl text-xl font-semibold px-2 h-8 pb-0.5 mt-2 ml-1.5 bg-primary text-black rounded-2xl" on:click={logIn}>login</button>
            <p class="switchMethod mb-2 mt-1 cursor-pointer underline" on:click={() => {isNewRegistration = !isNewRegistration}}>Neuen Account erstellen?</p>
        {/if}
    </form>
</body>

<style>
    :root {
        --primary: primaryColor;
    }
</style>