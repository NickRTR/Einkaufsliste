import supabase from "$lib/db.js";
import {get} from "svelte/store";
import {goto} from "$app/navigation";
import {products, theme, user, categories, priorityToCategory} from "$lib/stores.js";

// const dbSubscribe = supabase.from('products').on('*', payload => {getProducts()}).subscribe();

const userId = get(user).id;
var updatedCategories;
var priorities;
let updatedProducts;

let sort;

export const getProducts = async () => {
    let {data: dbProducts} = await supabase.from('products').select("*").order("sort", {ascending: true});
    products.update(products => [...dbProducts]);
    updatedProducts = dbProducts;

    let {data: userdata} = await supabase.from('userdata').select('*');
    userdata = userdata[0];

    theme.update(theme => userdata.theme);

    categories.update(categories => userdata.categories);
    updatedCategories = userdata.categories;

    priorities = userdata.priorityToCategory;
    priorityToCategory.update(priorityToCategory => Object.values(priorities));
}

export const addProduct = async (input) => {
    if (input !== "") {
        let titles = []
        for (let i = 0; i < updatedProducts.length; i++) {
            titles = [...titles, updatedProducts[i]]
            if (input === updatedProducts[i].title) {
                let result = confirm(`"${updatedProducts[i].title}" ist bereits vorhanden. Möchten Sie die Anzahl verdoppeln?`)
                if (result) {
                    let product = updatedProducts[i];
                    updateQuantity(product.amount * 2, product.type, product.id);
                }
                return;
            }
        }
        await supabase.from('products').insert([{title: input, category: getCategory(input), sort: sort, user_id: supabase.auth.user().id}]);
        getProducts();
    }
}

export const toggleChecked = async (id, created, checked) => {
    let now = created;
    if (checked == true) {
        now = new Date();
    }
    await supabase.from('products').update({"checked": !checked, "created_at": now}).eq("id", id);
    getProducts();
}

export const deleteProduct = async (id) => {
    await supabase.from('products').delete().eq("id", id);
    getProducts();
}

export const updateQuantity = async (amount, type, id) => {
    if (amount === "") {
        await supabase.from('products').update({"amount": 1, "type": type}).eq("id", id);
    } else {
        await supabase.from('products').update({"amount": amount, "type": type}).eq("id", id);
    }
}

// categories
export const getCategory = (input) => {
    const categoryList = ["Vorrat", "Gemüse", "Obst", "Kühlregal", "Gefriertruhe", "Fleisch", "Süßigkeiten", "Haushalt", "Getränke"];
    input = input.toLowerCase();
    input = input.trim();

    for (let i = 0; i < categoryList.length; i++) {
        if (updatedCategories[categoryList[i]].includes(input)) {
            let category = categoryList[i];
            getSort(category)
            return category;
        }
    }
    return "choose";
}

export const changeCategory = async (input, oldCategory, category, id) => {
    await supabase.from('products').update({"category": category}).eq("id", id);
    await supabase.from('products').update({"sort": await getSort(category)}).eq("id", id);

    if (oldCategory !== "choose") {
        updatedCategories[oldCategory] = updatedCategories[oldCategory].filter(value => value != input.toLowerCase());
    }
    updatedCategories[category] = [input.toLowerCase(), ...updatedCategories[category]];
    await supabase.from('userdata').update({"categories": updatedCategories}).eq("user_id", get(user).id);

    getProducts();
}

export const setTheme = async (color) => {
    theme.update(old => color);
    await supabase.from('userdata').update({"theme": color}).eq("user_id", userId);
}

export const createUserData = async (userId) => {
    await supabase.from('userdata').insert([
        {user_id: userId}
    ]);
}

export const changePriorities = async (changedPriorities) => {
    priorityToCategory.update(old => changedPriorities);
    await supabase.from('userdata').update({"priorityToCategory": changedPriorities}).eq("user_id", userId);
    priorities = changedPriorities;

    for (let i = 0; i < updatedProducts.length; i++) {
        let id = updatedProducts[i].id;
        let sort = await getSort(updatedProducts[i].category);
        await supabase.from('products').update({"sort": sort}).eq("id", id);
    }
    getProducts();
}

const getSort = async (category) => {
    for (let i = 0; i <= Object.keys(priorities).length; i++) {
        if (priorities[i] === category) {
            return i;
        }
    }
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