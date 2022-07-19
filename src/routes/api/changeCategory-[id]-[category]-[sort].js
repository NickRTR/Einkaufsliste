import supabase from "$lib/supabase";   

export async function get({ params }) {
    let { id, category, sort } = params;

    const { error } = await supabase.from("products").update({category, sort}).eq("id", id);

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