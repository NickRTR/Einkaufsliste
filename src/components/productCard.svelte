<script>
    import {toggleChecked, deleteProduct} from "../data/firebase.js";

    export let product;
</script>

<div class="Card text-2xl text-left p-1.5 m-2.5 bg-marine-bright rounded-xl break-words flex items-center">
    <img class="h-10 w-10 mr-1.5 text-xs" type="image" src="/category/{product.category}.svg" alt={product.category}>
    <p on:click={() => {toggleChecked(product.id, product.checked)}}>{product.title}</p>
    <input class="ml-auto mr-1 w-6 h-6" type="checkbox" checked={product.checked} on:click={() => {toggleChecked(product.id, product.created, product.checked)}}>
    <input class="mt-0.5 h-7 w-7 text-xs" type="image" src="/delete.svg" alt="delete" on:click={() => {deleteProduct(product.id)}}>
</div>