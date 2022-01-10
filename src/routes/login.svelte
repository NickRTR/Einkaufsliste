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
            console.log(error.message);
            if (error.message === "User already registered") {
                alert("Benutzer ist bereits registriert. Bitte anmelden!");
                isNewRegistration = false;
            } else {
                alert(error.message);
            }
        } else {
            $user = userDetails;
            createUserData(userDetails.id);
            goto("/");
        }
    }

    const logIn = async () => {
        let { user: userDetails, error } = await supabase.auth.signIn({
            email: emailInput,
            password: passwordInput,
        });
        if (error) {
            if (error.message === "Invalid login credentials") {
                alert("Falsche E-mail Adresse oder falsches Passwort. Sind Sie bereits registriert?")
            } else {
                alert(error.message);
            }
        } else {
            $user = userDetails;
            goto("/");
        }
    }
</script>

<body>
    {#if isNewRegistration}
        <h1 on:click={() => {isNewRegistration = !isNewRegistration}}>Registrieren</h1>
    {:else}
        <h1 on:click={() => {isNewRegistration = !isNewRegistration}}>Einloggen</h1>
    {/if}
    

    <form on:submit|preventDefault>
        <label for="email">E-mail: </label><br>
        <input type="email" id="email" placeholder="email@email.de" bind:value={emailInput}><br>
        <label for="password">Passwort: </label><br>
        <input type="password" id="password" placeholder="Passwort" minlength="8" bind:value={passwordInput}><br>

        {#if isNewRegistration}
            <button on:click={signUp}>registrieren</button>
            <p on:click={() => {isNewRegistration = !isNewRegistration}}>Besitzen Sie bereits einen Account?</p>
        {:else}
            <button  on:click={logIn}>einloggen</button>
            <p on:click={() => {isNewRegistration = !isNewRegistration}}>Neuen Account erstellen?</p>
        {/if}
    </form>
</body>

<style>
    body {
        text-align: center;
        color: #EEE;
    }

    h1 {
        margin: 0ch;
        font-size: 2.25rem;
        padding: .75rem 0;
        font-weight: 600;
        cursor: pointer;
    }

    form {
        margin-top: .5rem;
        font-weight: 600;
    }

    input {
        border: none;
        border-radius: 1rem;
        color: black;
        font-size: 1.25rem;
        font-weight: 600;
        padding: 0 0.75rem;
        margin: 0.5rem 0;
        height: 2rem;
    }

    input::placeholder {
        font-size: 1rem;
    }

    button {
        font-size: 1rem;
        border: none;
        padding: .4rem .75rem;
        margin-top: 0.5rem;
        background-color: #EEE;
        color: black;
        font-weight: 600;
        border-radius: 1rem;
    }

    p {
        margin-top: 0.7rem;
        cursor: pointer;
        text-decoration: underline;
        font-weight: 400;
    }
</style>