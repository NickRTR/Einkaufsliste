import {writable} from "svelte/store";
import supabase from "./db.js";

export const user = writable(supabase.auth.user() || false);

export const products = writable([]);

export const theme = writable(0);

export const categories = writable();