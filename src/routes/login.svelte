<script>
    import supabase from "$lib/db.js";
    import { wordList } from "$lib/stores.js";
    import { createUserData } from "$lib/supabase.js";
    import { onMount } from "svelte";
    import { get } from "svelte/store";
    import { translate } from "$lib/translations/translate";

    onMount(async () => {
        wordList.set(await translate(navigator.language));
    });

    let emailInput = "";
    let passwordInput = "";
    let showPassword = false;

    let isNewRegistration = false;

    const signUp = async () => {
        if (emailInput === "" || passwordInput === "") {
            return;
        }

        let { error } = await supabase.auth.signUp({
            email: emailInput,
            password: passwordInput,
        });
        if (error) {
            if (error.message === "User already registered") {
                alert(get(wordList).error.userAlreadyRegistered);
                isNewRegistration = false;
            } else if (error.message === "Password should be at least 6 characters") {
                alert(get(wordList).error.toShortPassword);
            } else {
                alert(error.message);
            }
        } else {
            createUserData();
        }
    }

    const logIn = async () => {
        if (emailInput === "" || passwordInput === "") {
            return;
        }

        let { error } = await supabase.auth.signIn({
            email: emailInput,
            password: passwordInput,
        });
        if (error) {
            if (error.message === "Invalid login credentials") {
                alert(get(wordList).error.wrongCredentials);
            } else {
                alert(error.message);
            }
        }
    }
</script>

<svelte:head>
    <title>Schoppy - Login</title>
</svelte:head>

<body>
    {#if isNewRegistration}
        <h1 on:click={() => {isNewRegistration = !isNewRegistration}}>{$wordList.login.unregistered.title}</h1>
    {:else}
        <h1 on:click={() => {isNewRegistration = !isNewRegistration}}>{$wordList.login.registered.title}</h1>
    {/if}

    <form on:submit|preventDefault>
        <label for="email">E-mail: </label><br>
        <input type="email" id="email" placeholder="email@email.com" bind:value={emailInput}><br>
        <label for="password">{$wordList.login.password}:</label><br>
        <div class="password">
            <input type="password" id="password" placeholder={$wordList.login.password} bind:value={passwordInput}>
            <input type="checkbox" id="togglePassword" class:show={showPassword} bind:checked={showPassword} on:change={() => {document.querySelector('#password').type = showPassword ? 'text' : 'password'}}>
            <label class="viewPasswordLabel" for="togglePassword"><img src="showPassword.svg" alt="show"></label><br>
        </div>

        {#if isNewRegistration}
            <button on:click={signUp}>{$wordList.login.unregistered.title}</button>
            <p on:click={() => {isNewRegistration = !isNewRegistration}}>{$wordList.login.unregistered.switch}</p>
        {:else}
            <button  on:click={logIn}>{$wordList.login.registered.title}</button>
            <p on:click={() => {isNewRegistration = !isNewRegistration}}>{$wordList.login.registered.switch}</p>
        {/if}
    </form>
</body>

<style>
    h1 {
        margin: 0;
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
        font-size: 1.25rem;
        font-weight: 600;
        padding: 0 0.5rem;
        margin: 0.5rem 0;
        height: 2rem;
    }

    input[type=email] {
        width: 300px;
    }

    input[type=password] {
        width: 268px;
    }

    input::placeholder {
        font-size: 1rem;
    }

    .password {
        display: flex;
        align-items: center;
        justify-content: center;
    }

    input[type=checkbox] {
		display: none;
	}

    .viewPasswordLabel {
		filter: opacity(50%);
	}

    input[type=checkbox]:checked + .viewPasswordLabel {
		filter: opacity(100%);
	}

	img {
		width: 2rem;
		margin-top: .2rem;
		cursor: pointer;
	}

    button {
        font-size: 1rem;
        border: none;
        padding: .4rem .75rem;
        margin-top: 0.5rem;
        background-color: #EEE;
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