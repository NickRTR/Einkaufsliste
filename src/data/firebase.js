import {firebaseConfig} from "./firebaseConfig.js";
import {initializeApp} from "firebase/app";
import {getFirestore, collection, onSnapshot, doc, updateDoc, deleteDoc, addDoc, setDoc, query, orderBy, getDocs, Timestamp, getDoc} from "firebase/firestore";
import {browser} from "$app/env";
import {categories} from "../data/categories.js";
import products from "./store.js";

// initialize Database
const firebaseApp = initializeApp(firebaseConfig);
const db = browser && getFirestore();

const createCollection = async (listName) => {
    const share = await getDoc(doc(db, listName, "share"));
    if (share.exists()) { 
        localStorage.clear();
        list = getListName();
    } else {
        let createdPassword = Math.floor(Math.random() * 10000) + 1000;
        localStorage.setItem("password", createdPassword)
        await addDoc(collection(db, listName), {
            title: "Bier",
            checked: false,
            category: "drink",
            created: Timestamp.now(),
        });
        await setDoc(doc(db, list, "share"), {
            list: list,
            password: createdPassword,
            created: Timestamp.fromMillis(9999999999),
        });
    }
}

const createList = () => {
    localStorage.clear();
    let createdList = Math.floor((Math.random() * 100)).toString();
    createCollection(createdList);
    return createdList;
}

export const getListName = () => {
    if (browser) {
        let getList = localStorage.getItem("list")
        if (getList === null) {
            getList = createList();
            localStorage.setItem("list", getList)
        }
        return getList;
    }
}

var list = getListName();

const sort = browser && query(collection(db, list), orderBy("created"));

// subscribe to changes
if (browser) {
    const unsubscribe = browser && onSnapshot(sort, () => {
        getData();
    });

    // get Data
    const getData = async () => {
        let fbProducts = [];
        const querySnapshot = await getDocs(sort);
            querySnapshot.forEach((doc) => {
                let product = {...doc.data(), id: doc.id};
                fbProducts = [product, ...fbProducts];
        });
        if (fbProducts.length == 0) {
            createCollection(list);
        }
        products.update(products => [...fbProducts]);
    }
}

// delete Product
export const deleteProduct = async (id) => {
    await deleteDoc(doc(db, list, id));
}

// toggle checked
export const toggleChecked = async (id, created, status) => {
    let time = created;
    if (status == true) {
        time = Timestamp.now();
    }
    await updateDoc(doc(db, list, id), {
        checked: !status,
        created: time,
    });
};

// add Products
export const handleInput = async (input) => {
    if (input !== "") {
        await addDoc(collection(db, list), {
            title: input,
            checked: false,
            category: getCategory(input),
            created: Timestamp.now(),
        });
    }
};

const getUpdatedCategories = () => {
    if (browser) {
        let storageCategories = JSON.parse(localStorage.getItem("categories"));
        if (storageCategories == null) {
            localStorage.setItem("categories", JSON.stringify(categories));
            storageCategories = categories;
        }
        return storageCategories;
    }
}

let updatedCategories = getUpdatedCategories();

// choose category corresponding to categories array
function getCategory(input) {
    input = input.toLowerCase();
    input = input.trim();

    let category = "choose";

    if (updatedCategories.milk.includes(input)) {
        category = "milk";
    }
    else if (updatedCategories.sausage.includes(input)) {
        category = "sausage";
    }
    else if (updatedCategories.frozen.includes(input)) {
        category = "frozen";
    }
    else if (updatedCategories.fruit.includes(input)) {
        category = "fruit";
    }
    else if (updatedCategories.vegetables.includes(input)) {
        category = "vegetables";
    }
    else if (updatedCategories.canned.includes(input)) {
        category = "canned";
    }
    else if (updatedCategories.drink.includes(input)) {
        category = "drink";
    }
    else if (updatedCategories.drogery.includes(input)) {
        category = "drogery";
    }
    else if (updatedCategories.noodles.includes(input)) {
        category = "noodles";
    }
    else if (updatedCategories.pencil.includes(input)) {
        category = "pencil";
    }
    else if (updatedCategories.sweets.includes(input)) {
        category = "sweet";
    }
    else if (updatedCategories.bread.includes(input)) {
        category = "bread";
    }
    else if (updatedCategories.sauce.includes(input)) {
        category = "sauce";
    }
    else if (updatedCategories.jam.includes(input)) {
        category = "jam";
    }
    else if (updatedCategories.spices.includes(input)) {
        category = "spices";
    }
    return category;
}

export const changeCategory = async (input, category, id) => {
    updatedCategories = getUpdatedCategories()
    let previousCategory = getCategory(input);
    if (previousCategory != "choose") {
        updatedCategories[previousCategory] = updatedCategories[previousCategory].filter(value => value != input.toLowerCase());
        localStorage.setItem("categories", JSON.stringify(updatedCategories));    
    }   
    updatedCategories[category] = [input.toLowerCase(), ...categories[category]];
    localStorage.setItem("categories", JSON.stringify(updatedCategories));
    await updateDoc(doc(db, list, id), {
        category: category,
    });
}

// login to List
export const login = async (inputList, inputPassword) => {
    let password;
    const dbPassword = await getDoc(doc(db, inputList, "share"));
    if (dbPassword.exists()) {
        password = dbPassword.data().password;

        if (inputPassword == password) {
            localStorage.setItem("list", inputList);
            localStorage.setItem("password", password);
            location.reload();
        } else {
            console.log("falsches Passwort");
        }
    } else {
        console.log("Liste nicht vorhanden");
    }
}
