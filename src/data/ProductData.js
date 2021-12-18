import {writable} from "svelte/store";
import {browser} from "$app/env";

if (browser) {
    const ProductList = writable(JSON.parse(localStorage.getItem("ProductList")) || [
        {
            id: 1,
            title: "Bier",
            checked: false,  
        },
        {
            id: 0,
            title: "Apfel",
            checked: false,  
        },
    ]);

    ProductList.subscribe((value) => localStorage.ProductList = JSON.stringify(value));
}

const ProductList = writable([
    {
        id: 1,
        title: "Bier",
        checked: false,  
    },
    {
        id: 0,
        title: "Apfel",
        checked: false,  
    },
]);

export default ProductList;