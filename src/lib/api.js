export async function send(form) {
  const res = await fetch(form.action, {
    method: form.method,
    body: new FormData(form),
    headers: { accept: "application/json" },
  });
  return await res.json();
}

import { products } from "$lib/stores";
import { toast } from "@zerodevx/svelte-toast";

export async function getProducts(specialFetch) {
  let res;

  if (specialFetch) {
    res = await specialFetch("/api/getProducts");
  } else {
    res = await fetch("/api/getProducts");
  }

  const data = await res.json();

  if (data.error) {
    toast.push("An error occured while fetching products: " + data.error);
  }

  if (data.products) {
    products.set(data.products);
  }
}
