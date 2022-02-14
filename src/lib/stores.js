import { writable } from "svelte/store";
import supabase from "$lib/db";

export const user = writable(supabase.auth.user() || false);

export const products = writable([]);

export const theme = writable(0);

export const categories = writable();

export const priorityToCategory = writable();

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