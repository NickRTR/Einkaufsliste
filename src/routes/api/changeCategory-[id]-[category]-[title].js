import supabase from "$lib/supabase";   

export async function get({ params }) {
    let { id, category, title } = params;

    // TODO: update sort

    const { error } = await supabase.from("products").update({category}).eq("id", id);

    if (error) {
        return {
            status: error.status,
            body: {
                error: error.message
            }
        }
    }

    return {
        status: 200,
    }
}