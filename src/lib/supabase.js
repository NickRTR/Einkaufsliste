import supabase from "$lib/db.js";
import {get} from "svelte/store";
import {goto} from "$app/navigation";
import {products, theme, user, categories, priorityToCategory} from "$lib/stores.js";

const dbSubscribe = supabase.from('products').on('*', payload => {getProducts()}).subscribe();

const userId = get(user).id;
var updatedCategories;
var priorities;

export const getProducts = async () => {
    let {data: dbProducts} = await supabase.from('products').select("*").order("category", {ascending: true});
    products.update(products => [...dbProducts]);

    let {data: color} = await supabase.from('userdata').select("theme");
    let dbTheme = color[0].theme;
    theme.update(theme => dbTheme);

    let {data: dbCategories} = await supabase.from('userdata').select("categories");
    categories.update(categories => dbCategories[0].categories);
    updatedCategories = dbCategories[0].categories

    let {data: dbPrioritytoCategory} = await supabase.from('userdata').select("priorityToCategory");
    priorityToCategory.update(priorities => dbPrioritytoCategory[0].priorityToCategory);
    priorities = dbPrioritytoCategory[0].priorityToCategory;
}

export const addProduct = async (input) => {     
    if (input != "") {
        await supabase.from('products').insert([{title: input, category: getCategory(input), user_id: supabase.auth.user().id}]);
    }
    getProducts();
}

export const toggleChecked = async (id, created, checked) => {
    let now = created;
    if (checked == true) {
        now = new Date();
    }
    await supabase.from('products').update({"checked": !checked, "created_at": now}).eq("id", id);
}

export const deleteProduct = async (id) => {
    await supabase.from('products').delete().eq("id", id);
}

export const updateQuantity = async (amount, type, id) => {
    await supabase.from('products').update({"amount": amount, "type": type}).eq("id", id);
}

// categories
export const getCategory = (input) => {
    const categoryList = ["Vorrat", "Gemüse", "Obst", "Kühlregal", "Gefriertruhe", "Fleisch", "Süßigkeiten", "Haushalt", "Getränke"];
    input = input.toLowerCase();
    input = input.trim();

    let category;
    for (let i = 0; i < categoryList.length; i++) {
        if (updatedCategories[categoryList[i]].includes(input)) {
            category = categoryList[i];
            for (let i = 0; i <= Object.keys(priorities).length; i++) {
                if (priorities[i] == category) {
                    return i;
                }
            }
        }
    }
    return 0;
}

export const decodeCategory = (input) => {
    return priorities[input];
}

export const codeCategory = (input) => {
    for (let i = 0; i <= Object.keys(priorities).length; i++) {
        if (priorities[i] == input) {
            return i;
        }
    }
}

export const changeCategory = async (input, oldCategory, category, id) => {
    await supabase.from('products').update({"category": codeCategory(category)}).eq("id", id);

    if (oldCategory !== 0) {
        oldCategory = decodeCategory(oldCategory);
        updatedCategories[oldCategory] = updatedCategories[oldCategory].filter(value => value != input.toLowerCase());
    }
    updatedCategories[category] = [input.toLowerCase(), ...updatedCategories[category]];
    await supabase.from('userdata').update({"categories": updatedCategories}).eq("user_id", get(user).id);
}

export const setTheme = async (color) => {
    theme.update(old => color);
    await supabase.from('userdata').update({"theme": color}).eq("user_id", userId);
}

export const createUserData = async (userId) => {
    await supabase.from('userdata').insert([
        {user_id: userId}
    ]);
    location.reload();
}

// auth
export const logout = async () => {
    let {error} = await supabase.auth.signOut();
    user.update(user => false)
    localStorage.clear();
    if (error) {
        console.log(error);
    }
    goto("/login");
}