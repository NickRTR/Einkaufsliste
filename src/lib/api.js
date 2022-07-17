export async function send(form) {
    const res = await fetch(form.action, {
        method: form.method,
        body: new FormData(form),
        headers: { accept: "application/json" }
    });
    return await res.json();
}

import { products } from "$lib/stores";

export async function getProducts(fetch) {
    const res = await fetch("/api/getProducts");
    const data = await res.json();

    if (data.error) {
        return {
            error: data.error
        }
    }

    if (data.products) {
        products.set(data.products);
    }
}