<script>
    import {deleteProduct, toggleChecked, changeCategory, updateQuantity} from "$lib/supabase.js";
    import {priorityToCategory} from "$lib/stores.js";

    export let product;
    let showChangeCategory = false;

    $: updateAmount(product.amount);
    $: updateType(product.type);

    const updateAmount = (updatedAmount) => {
        amount = updatedAmount;
    }

    const updateType = (updatedType) => {
        type = updatedType;
    }

    let amount = product.amount;
    let type = product.type;

    $: checkInput(amount);
    $: getSelection(type);

    const checkInput = (input) => {
        if (/^\d+$/.test(input)) {
            amount = input;
        } else if (input == "") {
            amount = 1;
        } else {
            input = input.toString();
            amount = input.substring(0, input.length - 1);
        }
    }

    const getSelection = (type) => {
        if (type != product.type) {
            updateQuantity(amount, type, product.id);
        }
    }

    const categories = ["Vorrat", "Gemüse", "Obst", "Kühlregal", "Gefriertruhe", "Fleisch", "Süßigkeiten", "Haushalt", "Getränke"];

    $: category = $priorityToCategory[product.category];
</script>
 
<div class="container mx-auto">
    <div class="Card p-1.5 m-2.5 bg-primary rounded-xl flex items-center break-words">
        <img class="h-14 w:14 mr-1 md:mr-2" type="image" src="/category/{category}.svg" alt={category} title={category} on:click={() => {showChangeCategory = !showChangeCategory}}>
        <p class="text-2xl" on:click={() => {showChangeCategory = !showChangeCategory}}>{product.title}</p>
        <div class="quantity ml-auto ">
            <div class="flex mb-1">
                <input class="w-10 rounded-xl rounded-r-none m-0 bg-black text-white border-none px-1 text-base md:text-lg md:font-semibold" type="text" maxlength="3" bind:value={amount} on:input={() => {updateQuantity(amount, type, product.id)}}>
                <select class="rounded-xl rounded-l-none m-0 bg-black text-white font-semibold" bind:value={type}>
                    <option value="stk">stk</option>
                    <option value="gr">gr</option>
                    <option value="kg">kg</option>
                    <option value="ml">ml</option>
                    <option value="l">l</option>
                </select>
            </div>
                <input class="w-7 h-7 align-middle" type="checkbox" bind:checked={product.checked} on:click={() => {toggleChecked(product.id, product.created, product.checked)}}>
                <input class="h-8 align-middle" type="image" src="/delete.svg" alt="delete" on:click={() => {deleteProduct(product.id)}}>
        </div>
    </div>
    {#if showChangeCategory}
        <div class="changeCategory grid grid-cols-3 justify-center rounded-xl mx-2.5 mt-1 p-1 pb-0 bg-primary">
            {#each categories as category}
                <div class="border-b-2 border-black" on:click={() => {showChangeCategory = !showChangeCategory; changeCategory(product.title, product.category, category, product.id)}}>
                    <p class="my-auto text-lg font-semibold break-all">{category}</p>
                    <img class="h-10 w-10 mb-1 mx-auto" src="/category/{category}.svg" alt={category} title={category}>
                </div>
            {/each}
        </div>
    {/if}
</div>