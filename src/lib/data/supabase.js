import supabase from "$lib/db.js";
import {goto} from "$app/navigation";
import {products} from "$lib/stores.js";
import {categories} from "./categories.js"

const dbSubscribe = supabase.from('products').on('*', payload => {getProducts()}).subscribe();

export const getProducts = async () => {
    let {data: dbProducts} = await supabase.from('products').select("*");
    console.log(dbProducts);
    products.update(products => [...dbProducts]);
}

export const addProduct = async (input, userId) => {     
    const {data, error} = await supabase.from('products').insert([
        {title: input, category: getCategory(input), user_id: userId}
    ]);
}

export const toggleChecked = async (id, created, checked) => {
    const { data, error } = await supabase.from('products').update({"checked": !checked}).eq("id", id);
}

export const deleteProduct = async (id) => {
    const { data, error } = await supabase.from('products').delete().eq("id", id);
}

export const updateQuantity = async (amount, type, id) => {
    const { data, error } = await supabase.from('products').update({"amount": amount, "type": type}).eq("id", id);
}

// categories
export const getCategory = (input) => {
    const categoryList = ["Vorrat", "Gemüse", "Obst", "Kühlregal", "Gefriertruhe", "Fleisch", "Süßigkeiten", "Haushalt", "Getränke"];
    input = input.toLowerCase();
    input = input.trim();

    let category = "choose";

    for (let i = 0; i < categoryList.length; i++) {
        if (categories[categoryList[i]].includes(input)) {
            category = categoryList[i];
            return category;
        }
    }
    return category;
}

export const changeCategory = async (input, category, id) => {
    const { data, error } = await supabase.from('products').update({"category": category}).eq("id", id);
    console.log("changeCategory");
}

// auth
export const logout = async () => {
    let {error} = await supabase.auth.signOut();
    if (error) {
        console.log(error);
    }
    goto("login")
}