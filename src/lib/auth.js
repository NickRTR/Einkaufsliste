import supabase from "$lib/db";
import { session } from "$lib/stores";
import { get } from "svelte/store";
import { goto } from "$app/navigation";

export function listenToAuthChanges() {
    session.set(supabase.auth.session());

    if (get(session) === null) {
        redirect();
    }

    supabase.auth.onAuthStateChange((event, authSession) => {
        session.set(authSession);
        redirect()
    })
}

function redirect() {
    setTimeout(() => get(session) ? goto("/") : goto("/auth/login")); // redirect
}