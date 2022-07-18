import supabase from "$lib/supabase";   

export async function get({ params }) {
    let { id, title, category } = params;

    console.log(category);

    // TODO: change category

    const { error } = await supabase.from("products").update({title, category}).eq("id", id);

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