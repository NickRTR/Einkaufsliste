<script>
    import {toggleChecked, deleteProduct, changeCategory} from "../data/firebase.js";

    export let product;
    let showCategorySreen = "hidden";

    const categories = ["Gebäck", "Konserven", "Getränke", "Drogerieartikel", "Tiefkühlartikel", "Früchte", "Brotaufstrich", "Milchprodukte", "Nudeln", "Arbeitsmaterialien", "Soßen", "Fleisch", "Gewürze", "Süßigkeiten", "Gemüse", "Technik", "Spirituosen"];

    const toggleCategoryScreen = () => {
        if (showCategorySreen == "hidden") {
            showCategorySreen = "";
        } else {
            showCategorySreen = "hidden"
        }
    }
</script>
 
<div class="container mx-auto">
    <div class="Card text-2xl p-1.5 m-2.5 bg-marine-bright rounded-xl break-words flex items-center">
        <img class="h-10 w-10 mr-1.5 text-xs" type="image" src="/category/{product.category}.svg" alt={product.category} title={product.category} on:click={toggleCategoryScreen}>
        <p on:click={() => {toggleChecked(product.id, product.checked)}}>{product.title}</p>
        <input class="ml-auto mr-1 w-6 h-6" type="checkbox" checked={product.checked} on:click={() => {toggleChecked(product.id, product.created, product.checked)}}>
        <input class="mt-0.5 h-7 w-7 text-xs" type="image" src="/delete.svg" alt="delete" on:click={() => {deleteProduct(product.id)}}>
    </div>
    <div class="changeCategory {showCategorySreen} flex flex-wrap justify-center rounded-xl mx-2.5 mt-1 p-1 bg-marine-bright">
        {#each categories as categorie}
            <img class="h-11 w-11 m-0.5 p-0.5 border-2 border-marine" src="/category/{categorie}.svg" alt={categorie} title={categorie} on:click={() => {toggleCategoryScreen(); changeCategory(product.title, categorie, product.id)}}>
        {/each}
    </div>
</div>