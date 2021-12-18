import {writable} from "svelte/store";

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
])

ProductList.subscribe((value) => localStorage.ProductList = JSON.stringify(value));

export default ProductList;