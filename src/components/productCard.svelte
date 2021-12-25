<script>
    import {toggleChecked, deleteProduct, changeCategory} from "../data/firebase.js";

    export let product;

    let showCategorySreen = "hidden";

    const toggleCategoryScreen = () => {
        if (showCategorySreen == "hidden") {
            showCategorySreen = "";
        } else {
            showCategorySreen = "hidden"
        }
    }
</script>
 
<div class="container block">
    <div class="Card text-2xl text-left p-1.5 m-2.5 mb-0 bg-marine-bright rounded-xl break-words flex items-center">
        <img class="h-10 w-10 mr-1.5 text-xs" type="image" src="/category/{product.category}.svg" alt={product.category} on:click={toggleCategoryScreen}>
        <p on:click={() => {toggleChecked(product.id, product.checked)}}>{product.title}</p>
        <input class="ml-auto mr-1 w-6 h-6" type="checkbox" checked={product.checked} on:click={() => {toggleChecked(product.id, product.created, product.checked)}}>
        <input class="mt-0.5 h-7 w-7 text-xs" type="image" src="/delete.svg" alt="delete" on:click={() => {deleteProduct(product.id)}}>
    </div>
    <div class="changeCategory {showCategorySreen} flex flex-wrap justify-center rounded-xl mx-2.5 mt-1 p-1 bg-marine-bright">
        <img class="h-11 w-11 m-0.5 p-0.5 border-2 border-marine" src="/category/bread.svg" alt="Brot" on:click={() => {toggleCategoryScreen(); changeCategory(product.title, "bread", product.id)}}>
        <img class="h-11 w-11 m-0.5 p-0.5 border-2 border-marine" src="/category/canned.svg" alt="Dosen" on:click={() => {toggleCategoryScreen(); changeCategory(product.title, "canned", product.id)}}>
        <img class="h-11 w-11 m-0.5 p-0.5 border-2 border-marine" src="/category/drink.svg" alt="Getränke" on:click={() => {toggleCategoryScreen(); changeCategory(product.title, "drink", product.id)}}>
        <img class="h-11 w-11 m-0.5 p-0.5 border-2 border-marine" src="/category/drogery.svg" alt="Drogerieartikel" on:click={() => {toggleCategoryScreen(); changeCategory(product.title, "drogery", product.id)}}>
        <img class="h-11 w-11 m-0.5 p-0.5 border-2 border-marine" src="/category/frozen.svg" alt="Tiefkühlkost" on:click={() => {toggleCategoryScreen(); changeCategory(product.title, "frozen", product.id)}}>
        <img class="h-11 w-11 m-0.5 p-0.5 border-2 border-marine" src="/category/fruit.svg" alt="Früchte" on:click={() => {toggleCategoryScreen(); changeCategory(product.title, "fruit", product.id)}}>
        <img class="h-11 w-11 m-0.5 p-0.5 border-2 border-marine" src="/category/jam.svg" alt="Brotaufstrich" on:click={() => {toggleCategoryScreen(); changeCategory(product.title, "jam", product.id)}}>
        <img class="h-11 w-11 m-0.5 p-0.5 border-2 border-marine" src="/category/milk.svg" alt="Milchprodukte" on:click={() => {toggleCategoryScreen(); changeCategory(product.title, "milk", product.id)}}>
        <img class="h-11 w-11 m-0.5 p-0.5 border-2 border-marine" src="/category/noodles.svg" alt="Nudeln" on:click={() => {toggleCategoryScreen(); changeCategory(product.title, "noodles", product.id)}}>
        <img class="h-11 w-11 m-0.5 p-0.5 border-2 border-marine" src="/category/sauce.svg" alt="Soßen" on:click={() => {toggleCategoryScreen(); changeCategory(product.title, "sauce", product.id)}}>
        <img class="h-11 w-11 m-0.5 p-0.5 border-2 border-marine" src="/category/sausage.svg" alt="Fleich" on:click={() => {toggleCategoryScreen(); changeCategory(product.title, "sausage", product.id)}}>
        <img class="h-11 w-11 m-0.5 p-0.5 border-2 border-marine" src="/category/spices.svg" alt="Gewürze" on:click={() => {toggleCategoryScreen(); changeCategory(product.title, "spices", product.id)}}>
        <img class="h-11 w-11 m-0.5 p-0.5 border-2 border-marine" src="/category/sweet.svg" alt="Süßigkeiten" on:click={() => {toggleCategoryScreen(); changeCategory(product.title, "sweet", product.id)}}>
        <img class="h-11 w-11 m-0.5 p-0.5 border-2 border-marine" src="/category/vegetables.svg" alt="Gemüse" on:click={() => {toggleCategoryScreen(); changeCategory(product.title, "vegetables", product.id)}}>
    </div>
</div>