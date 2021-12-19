<script>
    // firebase
    import {initializeApp, getApps, getApp} from "firebase/app";
    import {getFirestore, collection, onSnapshot, doc, updateDoc, deleteDoc, addDoc, query, orderBy, getDocs, Timestamp} from "firebase/firestore";
    import {firebaseConfig} from "../data/firebaseConfig.js"
    import {browser} from "$app/env"

    const firebaseApp = browser && (getApps().length === 0 ? initializeApp(firebaseConfig) : getApp());
    const db = browser && getFirestore();

    const sort = browser && query(collection(db, "products"), orderBy("created"));

    var products = [];

    // subscribe to changes
    const unsubscribe = browser && onSnapshot(sort, () => {
        getData();
    });

    // get Data
    const getData = async () => {
        let fbProducts = [];
        const querySnapshot = await getDocs(sort);
            querySnapshot.forEach((doc) => {
                let product = {...doc.data(), id: doc.id};
                fbProducts = [product, ...fbProducts];
        });
        products = fbProducts;
    }

    // delete
    const deleteProduct = async (id) => {
        await deleteDoc(doc(db, "products", id));
        
    }

    // toggle checked
    const toggleChecked = async (id, status) => {
        await updateDoc(doc(db, "products", id), {
            checked: !status,
        });
    };

    // add Products
    $: input = ""

    const handleInput = async () => {
        if (input !== "") {
            await addDoc(collection(db, "products"), {
                title: input,
                checked: false,
                created: Timestamp.now()
            });
        }
        input = "";
    };
</script>

<svelte:head>
    <title>Einkaufsliste</title>
</svelte:head>

<main>
    <h1>Einkaufsliste</h1>
    <form on:submit|preventDefault={handleInput}>
        <input type="text" bind:value={input}>
        <button type="submit">Add</button>
    </form>
    <div class="products">
        {#each products as product}
            <div class="Card">
                <div class="productTitle">
                    <input type="checkbox" id="checkbox+{product.id}" checked={product.checked} on:click={() => {toggleChecked(product.id, product.checked)}}>
                    <label for="checkbox+{product.id}" on:click={() => {toggleChecked(product.id, product.checked)}}>{product.title}</label>
                </div>
                <input type="image" src="/delete.png" alt="delete" on:click={() => {deleteProduct(product.id)}}>
            </div>
        {/each}
    </div>
</main>

<style>
    main {
        text-align: center;
    }

    h1 {
        font-size: 2em;
    }

    form {
        display: flex;
        justify-content: center;
        text-align: center;
        margin: 10px;
        margin-bottom: 15px;
    }

    input[type=text] {
        width: 80%;
        height: 35px;
        margin: 0;
        background-color: #F6C90E;
        padding: 0px 10px;
        border: none;
        border-radius: 15px;
        color: #303841;
        font-size: 1.5em;
    }

    button {
        font-size: 1.5em;
        height: 35px;
        background-color: #F6C90E;
        color: #303841;
        border-radius: 10px;
        margin-left: 5px;
        border: none;
    }

    /* Card Styles */

    .Card {
        margin: 10px;
        background-color: #3A4750;
        padding: 7px 10px;
        border-radius: 10px;
        display: grid;
        grid-template-columns: 1fr 25px;
        text-align: start;
        justify-content: center;
    }

    .productTitle {
        background-color: #3A4750;
        font-size: 1.7em;
    }

    label {
        background-color: #3A4750;
    }

    input[type=checkbox] {
        width: 20px;
        height: 20px;
    }

    input[type=image] {
        width: auto;
        height: auto;
        padding: 0;
        background-color: #3A4750;
        margin: auto;
    }
</style>
