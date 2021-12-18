<script>
    import ProductData from "../data/ProductData";
    import ProductCard from "../components/ProductCard.svelte";

    $: input = "";

    // update Product List in Global Storage
    const handleInput = () => {
        ProductData.update(currentProducts => {
            return [{id: $ProductData.length, title: input, checked: false}, ...currentProducts]
        })
        console.log($ProductData);
        input = "";
    }
</script>

<main>
    <h1>Einkaufsliste</h1>
    <form on:submit|preventDefault={handleInput}>
        <input type="text" bind:value={input}>
        <button type="submit">Add</button>
    </form>
    <div class="products">
        <ProductCard/>
    </div>
</main>

<style>
    main {
        text-align: center;
    }

    h1 {
        font-size: 2.5em;
    }

    form {
        display: flex;
        justify-content: center;
        text-align: center;
    }

    input {
        background-color: #F6C90E;
        padding: 0px 5px;
        border: none;
        border-radius: 15px;
        color: #303841;
        font-size: 1.5em;
    }

    button {
        font-size: 30px;
        background-color: #F6C90E;
        color: #303841;
        border-radius: 10px;
        margin-left: 5px;
        border: none;
    }
</style>
