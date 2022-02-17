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

    // console.log(JSON.stringify(
    //     {
    //     Kühlregal: ["milch", "butter", "sahne", "joghurt", "brei", "schmand", "schlagsahne", "käse", "quark", "pudding",
    //     "milk", "butter", "cream", "yogurt", "sour", "whipped cream", "cheese", "quark", "pudding"],

    //     Fleisch: ["fleisch", "fisch", "wurst", "hähnchen", "geflügel", "schinken", "lyoner", "salami", "pizzafleischkäse", "bierschinken", "currywurst", "bratwurst", "leberwurst", "landjäger", "weißwürste", "saitenwürste",
    //     "meat", "chicken", "poultry", "fish", "sausage", "ham"],

    //     Gefriertruhe: ["pommes", "kroketten", "eis", "gefrorenes", "frosta", "pizza",
    //     "fries", "croquettes", "ice cream", "frozen", "pizza"],

    //     Obst: ["obst", "früchte", "äpfel", "kirschen", "melone", "birne", "banane", "orange", "aprikose", "beeren", "kiwis", "avocado", "ananas", "pfirsich", "trauben", "rosinen", "granatapfel", "granatäpfel", "zitrone", "limette", "mango", "litschi", "kokosnuss", "mandarine", 
    //     "fruit", "apple", "cherries", "melon", "pear", "banana", "orange", "apricot", "berries", "currants", "kiwis", "avocado", "pineapple", "peach", "grapes", "raisins", "pomegranate", "lemon", "lime", "mango", "lychee", "coconut", "tangerine"],

    //     Gemüse: ["paprika", "zwiebel", "kartoffel", "gurke", "salat", "karotten", "erbsen", "bohnen", "brokkoli", "blumenkohl", "fenchel", "kohl", "möhren", "knoblauch", "kichererbsen", "pilze", "kohlrabi", "oliven", "kürbis", "auberginen", "radieschen", "rhabarber", "rosenkohl", "sellerie", "spinat", "spargel", "tomaten", "zucchini", "lauch", "spargel", 
    //     "pepper", "onion", "potato", "cucumber", "lettuce", "carrot", "peas", "beans", "broccoli", "cauliflower", "fennel", "cabbage", "garlic", "chickpea", "mushroom", "kohlrabi", "olives", "pumpkin", "aubergine", "radishes", "rhubarb", "brussel sprout", "celery", "spinach", "asparagus", "zucchini", "leeks", "asparagus"],

    //     Vorrat: ["brot", "brötchen", "wecken", "gebäck", "laugenstangen", "toast", "brezeln", "backpulver", "vanillinzucker", "kuchen", "empolvados", "croissant", "apfeltaschen", "käsestangen", "weihnachtsgebäck", "salz", "pfeffer", "petersilie", "basilikum", "zimt", "chilipulver", "paprikapulver", "maggi", "muskatnuss", "koriander", "ankerkraut", "curry", "fenchel", "ingwer", "knoblauch", "kümmel", "lorbeer", "minze", "oregano", "rosmarin", "salbei", "schnittlauch", "wacholderbeeren", "olivenöl", "marmelade", "nutella", "honig", "soße", "bratensoße", "ketchup", "rindersoße", "rahmsoße", "bechamelsoße", "hollandaise", "tomatensoße", "mayonnaise", "ravioli", "dosenwurst", "bohnen", "tütensuppen", "tütensuppe", "erbsen", "getrocknete tomaten", "sardinen", "nudeln", "spaghetti", "makkaroni", "fusilli", "penne", "rigatoni", "gnocchi", "tortellini", 
    //     "bread", "buns", "wakening", "pastry", "pretzel sticks", "toast", "pretzels", "baking powder", "vanillin sugar", "cake", "empolvados", "croissant" , "cheese sticks", "Christmas biscuits", "salt", "pepper", "parsley", "basil", "cinnamon", "chili powder", "paprika powder", "maggi", "nutmeg", " coriander", "anchor herb", "curry", "fennel", "ginger", "garlic", "cumin", "laurel", "mint", "oregano", "rosemary", "sage", "chives" , "juniper berries", "olive oil", "jam", "nutella", "honey", "sauce", "gravy", "ketchup", "beef sauce", "bechamel sauce", "hollandaise", " tomato sauce", "mayonnaise", "ravioli", "canned sausage", "packaged soup", "packaged soup", "peas", "dried tomatoes", "sardines", "noodles", "spaghetti", "macaroni ", "fusilli", "penne", "rigatoni", "gnocchi", "tortellini"],

    //     Getränke: ["bier", "wasser", "saft", "orangensaft", "alkohol", "kinderpunsch", "glühwein", "sprudel", "spezi", "fanta", "cola", "capri sonne", "energy drink", "traubensaft", "redbull", "durstlöscher", "sprite", "wein", "wodka", "rotwein", "weißwein", "roséwein", "schnaps", "gin tonic", 
    //     "beer", "water", "juice", "orange juice", "alcohol", "kids' punch", "special", "fanta", "coke", "energy drink", "grape juice", "redbull", "thirst quencher", "sprite", "wine", "vodka", "schnapps", "gin tonic"],

    //     Haushalt: ["waschmittel", "spülmittel", "zahnpasta", "duschgel", "zahnbürste", "zahnbürsten", "handseife", "seife", "lappen", "deo", "gel", "wachs", "rasierer", "kamm", "duschseife", "handtuch", "handtücher", "parfüm", "salbe", "creme", "stifte", "stift", "füller", "patronen", "ordner", "schnellhefter", "tintenkiller", "schere", "kleber", "flüssigkleber", "ordner", "bleistift", "lineal", "geodreieck", "spitzler", "block", "computer", "handy", "iphone", "maus", "tastatur", "monitor", "led kette", "kamera", "mikrofon", "mikro", "headset", "lampe", "telefon", "ladegerät",
    //     "detergent", "dishwashing liquid", "toothpaste", "shower gel", "toothbrush", "soap", "rag", "deodorant", "gel", "wax" , "razor", "comb", "towel", "perfume", "ointment", "pen", "cartridges", " folder", "fast stapler", "inkkiller", "scissors", "glue", "liquid glue", "folder", "pencil", "ruler", "set triangle", "spitzler", "pad", "computer" , "mobile phone", "iphone", "mouse", "keyboard", "monitor", "led chain", "camera", "microphone", "micro", "headset", "lamp", "phone", "charger"],

    //     Süßigkeiten: ["nimm2", "haribo", "gummibärchen", "schokolade", "twixx", "smarties", "mars", "chips", "m&m's", "snickers", "toblerone", "donuts", "kinder schokolade", "giotto", "lollis", "duplo", "oreo", "trolliwürmer", "kaugummis", "ritter sport schokolade", "ahoi brause", "esspapier", "rittersport schokolade",
    //     "haribo", "gummy bears", "chocolate", "twixx", "smarties", "mars", "chips", "m&m's", "snickers", "toblerone", "donuts", "giotto", "lollipops", "duplo", "oreo", "chewing gum", "ahoi fizzy", "edible paper"],
    // }
    // ))
}

export const getUserData = async () => {
    let {data: userdata} = await supabase.from('userdata').select('categories, priorityToCategory'); // get userdata
    userdata = userdata[0];
    // set categories
    categories.set(userdata.categories);
    updatedCategories = userdata.categories;
    // set category order
    priorities = userdata.priorityToCategory;
    priorityToCategory.set(Object.values(priorities));
}

export const getTheme = async () => {
    let {data: dbTheme} = await supabase.from('userdata').select('theme');
    theme.set(colors[dbTheme[0].theme]);
}

export const setTheme = async () => {
    let index = colors.findIndex(color => get(theme) === color);
    if (index === colors.length - 1 || index === -1) {
        theme.set(colors[0]);
    } else {
        theme.set(colors[index + 1]);
    }
    await supabase.from('userdata').update({"theme": index + 1}).eq("user_id", userId);
}

export const addProduct = async (input) => {
    if (input !== "") {
        for (let i = 0; i < updatedProducts.length; i++) {
            let updatedProduct = updatedProducts[i];
            if (input === updatedProduct.title) {
                if (updatedProduct.checked === false) {
                    let result = confirm(`"${updatedProduct.title}" ist bereits vorhanden. Möchten Sie die Anzahl um 1 erhöhen?`);
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
        }
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
    input = input.toLowerCase();
    input = input.trim();
    
    // first, check if there's an explicit fit
    for (let i = 0; i < priorities.length; i++) {
        if (updatedCategories[priorities[i]].includes(input)) {
            let category = priorities[i];
            return category;
        }
    }

    //then check if there's an other not perfect fitting entry
    for (let i = 0; i < priorities.length; i++) {
        for (let y = 0; y < updatedCategories[priorities[i]].length; y++) {
            let product = updatedCategories[priorities[i]];
            if (product[y].includes(input)) {
                let category = priorities[i];
                return category;
            }
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
    getUserData();
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
        location.reload();
    });
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