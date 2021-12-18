import {writable} from "svelte/store"

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
])

export default ProductList;