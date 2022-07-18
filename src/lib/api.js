export async function send(form) {
    const res = await fetch(form.action, {
        method: form.method,
        body: new FormData(form),
        headers: { accept: "application/json" }
    });
    return await res.json();
}

import { products, error } from "$lib/stores";
import { browser } from "$app/env";
import { get } from "svelte/store";

export async function getProducts(serverFetch) {
    let res;

    if (browser) {
        res = await fetch("/api/getProducts");
    } else {
        res = await serverFetch("/api/getProducts");
    }
    
    const data = await res.json();

    error.set(data.error);

    if (data.products) {
        products.set(data.products);
    }
}