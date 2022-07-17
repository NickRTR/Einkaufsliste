import supabase from "$lib/supabase";   

export async function get({ params }) {
    let { id, title, category } = params;

    // TODO: change category

    const { error } = await supabase.from("products").update({"title": title}).eq("id", id);

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