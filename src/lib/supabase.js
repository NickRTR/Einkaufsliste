import supabase from "$lib/db.js";
import { get } from "svelte/store";
import { goto } from "$app/navigation";
import { products, theme, user, categories, priorityToCategory } from "$lib/stores";

// white, lightpink, purple, babyblue, babygreen, orange
const colors = ["#EEE", "#F2CCC3", "#B7D3F2", "#a1c181", "#e9c46a"];

const userId = get(user).id;
var updatedCategories;
var priorities;
let updatedProducts;

export const getProducts = async () => {
    let {data: dbProducts} = await supabase.from('products').select("*").order("sort", {ascending: true});
    products.set([...dbProducts]);
    updatedProducts = dbProducts;

    let {data: userdata} = await supabase.from('userdata').select('*');
    userdata = userdata[0];

    categories.set(userdata.categories);
    updatedCategories = userdata.categories;

    priorities = userdata.priorityToCategory;
    priorityToCategory.set(Object.values(priorities));
}

export const getTheme = async () => {
    let {data: dbTheme} = await supabase.from('userdata').select('theme');
    theme.set(colors[dbTheme[0].theme]);
}

export const setTheme = async () => {
    let index = colors.findIndex(color => get(theme) === color);
    if (index === colors.length) {
        theme.set(colors[0]);
    } else {
        theme.set(colors[index + 1]);
    }
    await supabase.from('userdata').update({"theme": index + 1}).eq("user_id", userId);
}

export const addProduct = async (input) => {
    if (input !== "") {
        updatedProducts.forEach(updatedProduct => {
            if (input === updatedProduct.title) {
                if (updatedProduct.checked === false) {
                    let result = confirm(`"${updatedProduct.title}" ist bereits vorhanden. Möchten Sie die Anzahl um 1 erhöhen?`)
                    if (result) {
                        let product = updatedProduct;
                        updateAmount(product.amount + 1, product.id);
                    }
                    return;
                } else {
                    toggleChecked(updatedProduct.id, updatedProduct.created, updatedProduct.checked);
                    return;
                }
            }
        });
        let category = getCategory(input);
        let sort = await getSort(category);
        await supabase.from('products').insert([{title: input, category: category, sort: sort, user_id: supabase.auth.user().id}]);
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

export const updateAmount = async (amount, id) => {
    if (amount === "") {
        await supabase.from('products').update({"amount": 1}).eq("id", id);
    } else {
        await supabase.from('products').update({"amount": amount}).eq("id", id);
    }
    getProducts();
}

export const updateType = async (type, id) => {
    await supabase.from('products').update({"type": type}).eq("id", id);
    getProducts();
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


export const createUserData = async (userId) => {
    await supabase.from('userdata').insert([
        {user_id: userId}
    ]);
}

export const changePriorities = async (changedPriorities) => {
    priorityToCategory.set(changedPriorities);
    await supabase.from('userdata').update({"priorityToCategory": changedPriorities}).eq("user_id", userId);
    priorities = changedPriorities;

    updatedProducts.forEach(async updatedProduct => {
        let id = updatedProduct.id;
        let sort = await getSort(updatedProduct.category);
        await supabase.from('products').update({"sort": sort}).eq("id", id);
    });
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
    user.set(false)
    localStorage.clear();
    if (error) {
        console.log(error);
    }
    goto("/login");
}