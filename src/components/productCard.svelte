<script>
    import {toggleChecked, deleteProduct, changeCategory, updateQuantity} from "../data/firebase.js";

    export let product;
    let showCategorySreen = "hidden";

    $: updateAmount(product.quantity.amount);
    $: updateType(product.quantity.type);

    const updateAmount = (updatedAmount) => {
        amount = updatedAmount;
    }

    const updateType = (updatedType) => {
        type = updatedType;
    }

    let amount = product.quantity.amount;
    let type = product.quantity.type;

    $: checkInput(amount);
    $: getSelection(type);

    const checkInput = (input) => {
        if (/^\d+$/.test(input)) {
            amount = input;
        } else {
            input = input.toString();
            amount = input.substring(0, input.length - 1);
        }
    }

    const getSelection = (type) => {
        updateQuantity(amount, type, product.id);
    }

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
    <div class="Card text-2xl p-1.5 m-2.5 bg-primary rounded-xl flex items-center break-words">
        <img class="h-8 w-8 md:h-10 md:w-10 mr-1 md:mr-2" type="image" src="/category/{product.category}.svg" alt={product.category} title={product.category} on:click={toggleCategoryScreen}>
        <p class="text-lg md:text-2xl" on:click={() => {toggleChecked(product.id, product.checked)}}>{product.title}</p>
        <div class="quantity ml-auto mr-2 flex">
            <input class="w-10 rounded-xl rounded-r-none m-0 bg-black text-white border-none px-1 text-base md:text-lg md:font-semibold" type="text" maxlength="3" bind:value={amount} on:input={() => {updateQuantity(amount, type, product.id)}}>
            <select class="text-sm md:text-base w-12 rounded-xl rounded-l-none m-0 bg-black text-white font-semibold" bind:value={type}>
                <option class="font-semibold" value="stk">stk</option>
                <option class="font-semibold" value="gr">gr</option>
                <option class="font-semibold" value="kg">kg</option>
                <option class="font-semibold" value="ml">ml</option>
                <option class="font-semibold" value="l">l</option>
            </select>
        </div>
        <input class="mr-1 w-6 h-6" type="checkbox" checked={product.checked} on:click={() => {toggleChecked(product.id, product.created, product.checked)}}>
        <input class="h-7 w-7 text-xs" type="image" src="/delete.svg" alt="delete" on:click={() => {deleteProduct(product.id)}}>
    </div>
    <div class="changeCategory {showCategorySreen} flex flex-wrap justify-center rounded-xl mx-2.5 mt-1 p-1 bg-primary">
        {#each categories as categorie}
            <img class="h-10 w-10 m-0.5 p-0.5 border-2 border-black" src="/category/{categorie}.svg" alt={categorie} title={categorie} on:click={() => {toggleCategoryScreen(); changeCategory(product.title, categorie, product.id)}}>
        {/each}
    </div>
</div>