<script>
    import { goto } from "$app/navigation";
    import supabase from "$lib/db.js";
    import {user} from "$lib/stores.js";

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

<body>
    <h1>Login / Signup</h1>

    <form on:submit|preventDefault>
        <label for="email">email: </label>
        <br>
        <input type="email" id="email" placeholder="email@email.com" bind:value={emailInput}>
        <br>  
        <label for="password">password: </label>
        <br>
        <input type="password" id="password" placeholder="password" bind:value={passwordInput}>
        <br>

        {#if isNewRegistration}
            <button on:click={signUp}>SignUp</button>
            <p class="switchMethod" on:click={() => {isNewRegistration = !isNewRegistration}}>Already have an account?</p>
        {:else}
            <button on:click={logIn}>LogIn</button>
            <p class="switchMethod" on:click={() => {isNewRegistration = !isNewRegistration}}>Create a new account?</p>
        {/if}
    </form>
</body>

<style>
    h1 {
        text-align: center;
        color: #FCA311;
    }

    form {
        text-align: center;
        background: #FCA311;
        padding: 20px;
        border-radius: 20px;
        color: #14213D;
    }

    input {
        background-color: #14213D;
        font-size: 1.4em;
        padding: 5px 10px;
        margin: 5px 0px;    
        border: none;
        border-radius: 20px;
        color: #E5E5E5;
    }

    label {
        font-weight: bold;
        font-size: 1.2em;
    }

    button {
        cursor: pointer;
        margin-top: 10px;
        background-color: #14213D;
        font-size: 1.2em;
        color: #E5E5E5;
        border-radius: 20px;
        padding: 8px 15px;
        border: none;
    }

    .switchMethod {
        font-size: 1.2em;
        margin-bottom: 0px;
        margin-top: 12px;
        text-decoration: underline;
        cursor: pointer;
    }
</style>