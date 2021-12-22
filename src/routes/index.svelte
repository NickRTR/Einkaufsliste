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

<main class="text-center text-bee bg-marine min-h-screen h-full pb-1">
    <h1 class="text-4xl py-5 font-semibold">Einkaufsliste</h1>
    <form class="flex mb-4 mt-1 justify-center" on:submit|preventDefault={handleInput}>
        <input class="m-0 w-3/4 h-8 px-2 bg-bee border-none text-lg text-marine font-semibold rounded-xl" type="text" bind:value={input}>
        <button class="text-lg font-semibold px-2 ml-1.5 bg-bee text-marine rounded-xl" type="submit">Add</button>
    </form>
    <div class="products bg-marine">
        {#each products as product}
            <div class="Card text-left m-2.5 bg-marine-bright px-2.5 py-1 rounded-xl grid grid-cols-12">
                <div class="text-2xl bg-marine-bright col-span-11 mb-1">
                    <input class="align-middle w-5 h-5" type="checkbox" id="checkbox+{product.id}" checked={product.checked} on:click={() => {toggleChecked(product.id, product.checked)}}>
                    <label class="align-middle" for="checkbox+{product.id}" on:click={() => {toggleChecked(product.id, product.checked)}}>{product.title}</label>
                </div>
                <input class="col-span-1 m-auto mt-0.5" type="image" src="/delete.png" alt="delete" on:click={() => {deleteProduct(product.id)}}>
            </div>
        {/each}
    </div>
</main>