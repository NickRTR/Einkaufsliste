// @ts-nocheck
import { writable } from "svelte/store";
import { translation } from "./translations/en";
import { translate } from "$lib/translations/translate";
import { browser } from "$app/env";

export const products = writable([]);

export const theme = writable("#EEE");

export const categories = writable();

export const priorityToCategory = writable();

export const session = writable();

export const wordList = writable(translation); // initialize worldList with Englisch until right language is being loaded

if (browser) {
    if (localStorage.getItem("language")) {
        wordList.set(await translate(localStorage.getItem("language")))
    } else {
        wordList.set(await translate(navigator.language));
    }
}

// {
//     1: "Gemüse",
//     2: "Obst",
//     3: "Vorrat",
//     4: "Fleisch",
//     5: "Gefriertruhe",
//     6: "Kühlregal",
//     7: "Haushalt",
//     8: "Süßigkeiten",
//     9: "Getränke",
// }