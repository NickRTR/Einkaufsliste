import supabase from "$lib/supabase";

export async function get() {
    let { error } = await supabase.auth.signOut();

    console.error(error);

    return {
        status: 303,
        headers: {
            location: "/auth/login"
        }
    }
}