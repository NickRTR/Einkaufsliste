import {firebaseConfig} from "./firebaseConfig.js";
import {initializeApp, getApps, getApp} from "firebase/app";
import {getFirestore, collection, onSnapshot, doc, updateDoc, deleteDoc, addDoc, setDoc, query, orderBy, getDocs, Timestamp, getDoc} from "firebase/firestore";
import {browser} from "$app/env";

import products from "./store.js";
import {categories} from "../data/categories.js";

while(true) {
    try {
        localStorage.clear();
        const firebaseApp = browser && (getApps().length === 0 ? initializeApp(firebaseConfig) : getApp());
        break;
    } catch (e) {
        console.log(e);
    }
}

const db = browser && getFirestore();

const createCollection = async (listName) => {
    await addDoc(collection(db, listName), {
        title: "Bier",
        checked: false,
        category: getCategory(listName),
        created: Timestamp.now(),
    });
    await setDoc(doc(db, list, "share"), {
        list: list,
        password: 1234,
        created: Timestamp.fromMillis(9999999999),
    });
}

const createList = () => {
    localStorage.clear();
    let createdList = Math.floor((Math.random() * 1000)).toString();
    createCollection(createdList)
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
            products.update(products => [...fbProducts]);
            listName = fbProducts[fbProducts.length - 1].list;
            listPassword = fbProducts[fbProducts.length - 1].password;
            if (products.length == 0) {
                createCollection(list);
            }
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

// choose category corresponding to categories array
function getCategory(input) {
    if (categories.milk.includes(input.toLowerCase())) {
        return "milk";
    }
    else if (categories.sausage.includes(input.toLowerCase())) {
        return "sausage";
    }
    else if (categories.frozen.includes(input.toLowerCase())) {
        return "frozen";
    }
    else if (categories.fruit.includes(input.toLowerCase())) {
        return "fruit";
    }
    else if (categories.vegetables.includes(input.toLowerCase())) {
        return "vegetables";
    }
    else if (categories.canned.includes(input.toLowerCase())) {
        return "canned";
    }
    else if (categories.drink.includes(input.toLowerCase())) {
        return "drink";
    }
    else if (categories.drogery.includes(input.toLowerCase())) {
        return "drogery";
    }
    else if (categories.noodles.includes(input.toLowerCase())) {
        return "noodles";
    }
    else if (categories.sweets.includes(input.toLowerCase())) {
        return "sweet";
    }
    else if (categories.bread.includes(input.toLowerCase())) {
        return "bread";
    }
    else if (categories.sauce.includes(input.toLowerCase())) {
        return "sauce";
    }
    else if (categories.jam.includes(input.toLowerCase())) {
        return "jam";
    }
    else {
        return "choose";
    }
}

export const shareList = () => {
}

// login to List

const getDbPassword = async (inputList) => {

}

export const login = async (inputList, inputPassword) => {
    let password;
    const dbPassword = await getDoc(doc(db, inputList, "share"));
    if (dbPassword.exists()) {
        password = dbPassword.data().password;

        if (inputPassword == password) {
            localStorage.setItem("list", inputList)
            window.location.reload();
        } else {
            console.log("falsches Passwort");
        }
    } else {
        console.log("Liste nicht vorhanden");
    }
}