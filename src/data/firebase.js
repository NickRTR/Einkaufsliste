import {firebaseConfig} from "./firebaseConfig.js";
import {initializeApp, getApps, getApp} from "firebase/app";
import {getFirestore, collection, onSnapshot, doc, updateDoc, deleteDoc, addDoc, setDoc, query, orderBy, getDocs, Timestamp, getDoc} from "firebase/firestore";
import {browser} from "$app/env";

import products from "./store.js";
import {categories} from "../data/categories.js";

while(true) {
    try {
        const firebaseApp = browser && (getApps().length === 0 ? initializeApp(firebaseConfig) : getApp());
        break;
    } catch (e) {
        console.log(e);
    }
}

const db = browser && getFirestore();

const createCollection = async (listName) => {
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

const setCategorieList = () => {
    localStorage.setItem("categories", JSON.stringify(categories));
}

const createList = () => {
    localStorage.clear();
    let createdList = Math.floor((Math.random() * 1000)).toString();
    createCollection(createdList);
    setCategorieList();
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

var listName;
var listPassword;

// subscribe to changes
while(true) {
    try {
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
            listName = fbProducts[fbProducts.length - 1].list;
            listPassword = fbProducts[fbProducts.length - 1].password;
        }
        break;
    } catch (e) {
        console.log(e);
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
    let storageCategories = JSON.parse(localStorage.getItem("categories"));
    if (storageCategories == null) {
        localStorage.setItem("categories", JSON.stringify(categories));
        storageCategories = categories;
    }
    return storageCategories;
}

let updatedCategories = getUpdatedCategories();

// choose category corresponding to categories array
function getCategory(input) {
    let category = "choose";

    if (updatedCategories.milk.includes(input.toLowerCase())) {
        category = "milk";
    }
    else if (updatedCategories.sausage.includes(input.toLowerCase())) {
        category = "sausage";
    }
    else if (updatedCategories.frozen.includes(input.toLowerCase())) {
        category = "frozen";
    }
    else if (updatedCategories.fruit.includes(input.toLowerCase())) {
        category = "fruit";
    }
    else if (updatedCategories.vegetables.includes(input.toLowerCase())) {
        category = "vegetables";
    }
    else if (updatedCategories.canned.includes(input.toLowerCase())) {
        category = "canned";
    }
    else if (updatedCategories.drink.includes(input.toLowerCase())) {
        category = "drink";
    }
    else if (updatedCategories.drogery.includes(input.toLowerCase())) {
        category = "drogery";
    }
    else if (updatedCategories.noodles.includes(input.toLowerCase())) {
        category = "noodles";
    }
    else if (updatedCategories.sweets.includes(input.toLowerCase())) {
        category = "sweet";
    }
    else if (updatedCategories.bread.includes(input.toLowerCase())) {
        category = "bread";
    }
    else if (updatedCategories.sauce.includes(input.toLowerCase())) {
        category = "sauce";
    }
    else if (updatedCategories.jam.includes(input.toLowerCase())) {
        category = "jam";
    }
    else if (updatedCategories.spices.includes(input.toLowerCase())) {
        category = "spices";
    }
    return category;
}

export const changeCategory = async (input, category, id) => {
    updatedCategories = getUpdatedCategories()
    if (category != "choose") {
        updatedCategories[category].filter(value => value != input);
    }
    updatedCategories[category] = [input.toLowerCase(), ...categories[category]];
    localStorage.setItem("updatedCategories", JSON.stringify(updatedCategories));
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
