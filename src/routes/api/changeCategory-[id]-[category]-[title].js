import supabase from "$lib/supabase";   

export async function get({ params }) {
    let { id, category, title } = params;

    // TODO: update sort

    const { error } = await supabase.from("products").update({category}).eq("id", id);

    if (error) {
        console.error(error.message);
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