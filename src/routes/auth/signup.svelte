<script>
    import supabase from "$lib/db.js";
    import { wordList } from "$lib/stores.js";
    import { createUserData } from "$lib/supabase.js";
    import { get } from "svelte/store";
    import { goto } from "$app/navigation";

    let emailInput = "";
    let passwordInput = "";
    let showPassword = false;

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
            } else if (error.message === "Password should be at least 6 characters") {
                alert(get(wordList).error.toShortPassword);
            } else {
                alert(error.message);
            }
        } else {
            createUserData();
        }
    }
</script>

<svelte:head>
    <title>Schoppy - {$wordList.login.unregistered.title}</title>
</svelte:head>

<body>
    <h1>{$wordList.login.unregistered.title}</h1>

    <form on:submit|preventDefault>
        <label for="email">E-mail: </label><br>
        <input type="email" id="email" placeholder="email@email.com" bind:value={emailInput}><br>
        <label for="password">{$wordList.login.password}:</label><br>
        <div class="password">
            <input type="password" id="password" placeholder={$wordList.login.password} bind:value={passwordInput}>
            <input type="checkbox" id="togglePassword" class:show={showPassword} bind:checked={showPassword} on:change={() => {
                // @ts-ignore
                document.querySelector('#password').type = showPassword ? 'text' : 'password'}}>
            <label class="viewPasswordLabel" for="togglePassword"><img src="/showPassword.svg" alt="show"></label><br>
        </div>
        <button on:click={signUp}>{$wordList.login.unregistered.title}</button>
        <p on:click={() => {goto("/auth/login")}}>{$wordList.login.unregistered.switch}</p>
    </form>
</body>

<style>
    h1 {
        margin: 0;
        cursor: pointer;
    }

    form {
        margin-top: 1rem;
        font-weight: 600;
    }

    input {
        outline: none;
        border: 2px solid transparent;
        transition: all .1s ease-in-out;
        border-radius: 1rem;
        font-size: 1.25rem;
        font-weight: 600;
        padding: 0 0.5rem;
        margin: 0.5rem 0;
        height: 2rem;
    }

    input:hover, input:focus {
        border-color: var(--accent);
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
        border-radius: 100%;
	}
    
    input[type=checkbox]:checked + .viewPasswordLabel {
        filter: opacity(100%);
	}
    
	img {
        width: 2rem;
		cursor: pointer;
	}

    button {
        font-size: 1rem;
        outline: none;
        border: 3px solid transparent;
        transition: all .1s ease-in-out;
        padding: .3rem .7rem;
        margin-top: 0.5rem;
        background-color: var(--accent);
        font-weight: 600;
        border-radius: 1rem;
    }

    button:hover, button:focus {
        border-color: var(--minor);
    }

    p {
        margin-top: 0.7rem;
        cursor: pointer;
        text-decoration: underline;
        font-weight: 400;
    }
</style>