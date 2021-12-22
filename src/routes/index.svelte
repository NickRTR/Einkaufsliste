<script>
    import {categories} from "../data/categories.js";

    // firebase
    import {initializeApp, getApps, getApp} from "firebase/app";
    import {getFirestore, collection, onSnapshot, doc, updateDoc, deleteDoc, addDoc, query, orderBy, getDocs, Timestamp} from "firebase/firestore";
    import {firebaseConfig} from "../data/firebaseConfig.js";
    import {browser} from "$app/env";

    const firebaseApp = browser && (getApps().length === 0 ? initializeApp(firebaseConfig) : getApp());
    const db = browser && getFirestore();

    const sort = browser && query(collection(db, "products"), orderBy("created"));

    var products = [];

    // subscribe to changes
    while(true) {
        try {
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
            break;
        } catch (e) {
            console.log(e);
        }
    }

    // delete Product
    const deleteProduct = async (id) => {
        await deleteDoc(doc(db, "products", id));
    }

    // toggle checked
    const toggleChecked = async (id, created, status) => {
        let time = created;
        if (status == true) {
            time = Timestamp.now();
        }
        await updateDoc(doc(db, "products", id), {
            checked: !status,
            created: time,
        });
    };

    // add Products
    $: input = "";

    const handleInput = async () => {
        if (input !== "") {
            await addDoc(collection(db, "products"), {
                title: input,
                checked: false,
                category: getCategory(input),
                created: Timestamp.now(),
            });
        }
        input = "";
    };

    function getCategory(input) {
        // choose category corresponding to categories array

        if (categories.milk.includes(input.toLowerCase())) {
            return "milk";
        }
        else if (categories.sausage.includes(input.toLowerCase())) {
            return "sausage";
        }
        else if (categories.frozen.includes(input.toLowerCase())) {
            return "frozen";
        }
        else if (categories.fruit.includes(input.toLowerCase())) {
            return "fruit";
        }
        else if (categories.vegetables.includes(input.toLowerCase())) {
            return "vegetables";
        }
        else if (categories.canned.includes(input.toLowerCase())) {
            return "canned";
        }
        else if (categories.drink.includes(input.toLowerCase())) {
            return "drink";
        }
        else if (categories.drogery.includes(input.toLowerCase())) {
            return "drogery";
        }
        else if (categories.noodles.includes(input.toLowerCase())) {
            return "noodles";
        }
        else if (categories.sweets.includes(input.toLowerCase())) {
            return "sweet";
        }
        else if (categories.bread.includes(input.toLowerCase())) {
            return "bread";
        }
        else if (categories.sauce.includes(input.toLowerCase())) {
            return "sauce";
        }
        else if (categories.jam.includes(input.toLowerCase())) {
            return "jam";
        }
        else {
            return "choose"
        }
    }
</script>

<svelte:head>
    <title>Einkaufsliste</title>
</svelte:head>

<main class="bg-marine md:px-40 lg:px-64 xl:px-96">
    <div class="text-center text-bee pb-1">
        <h1 class="text-4xl py-5 font-semibold">Einkaufsliste</h1>
        <form class="flex mb-4 mt-1 justify-center" on:submit|preventDefault={handleInput}>
            <input class="m-0 w-3/4 h-8 px-2 bg-bee border-none text-lg text-marine font-semibold rounded-xl" type="text" bind:value={input}>
            <button class="text-lg font-semibold px-2 ml-1.5 bg-bee text-marine rounded-xl" type="submit">Add</button>
        </form>
        <div class="products bg-marine">
            {#each products as product}
                {#if !product.checked}
                    <div class="Card text-2xl text-left p-1.5 m-2.5 bg-marine-bright rounded-xl break-words flex items-center">
                        <img class="h-10 w-10 mr-1.5 text-xs" type="image" src="/category/{product.category}.svg" alt={product.category}>
                        <p class="" on:click={() => {toggleChecked(product.id, product.checked)}}>{product.title}</p>
                        <input class="ml-auto mr-1 w-6 h-6" type="checkbox" checked={product.checked} on:click={() => {toggleChecked(product.id, product.created, product.checked)}}>
                        <input class="mt-0.5 h-7 w-7 text-xs" type="image" src="/delete.svg" alt="delete" on:click={() => {deleteProduct(product.id)}}>
                    </div>
                {/if}
            {/each}
        </div>
        <div class="checkedProducts mt-10">
            {#each products as product}
                {#if product.checked}
                    <div class="checkedCard text-2xl text-left p-1.5 m-2.5 bg-marine-bright rounded-xl break-words flex items-center">
                        <input class="h-10 w-10 mr-1.5" type="image" src="/category/{product.category}.svg" alt="(delete)">
                        <p class="" on:click={() => {toggleChecked(product.id, product.created, product.checked)}}>{product.title}</p>
                        <input class="ml-auto mr-1 w-6 h-6" type="checkbox" checked={product.checked} on:click={() => {toggleChecked(product.id, product.created, product.checked)}}>
                        <input class="mt-0.5 h-7 w-7 text-xs" type="image" src="/delete.svg" alt="delete" on:click={() => {deleteProduct(product.id)}}>
                    </div>
                {/if}
            {/each}
        </div>
    </div>
</main>