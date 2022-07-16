import supabase from "$lib/supabase";

export async function get({ params }) {
    let { id, checked } = params;

    const { data, error } = await supabase.from("products").update({"checked": !checked}).eq("id", id);

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
        body: {
            data
        }
    }
}