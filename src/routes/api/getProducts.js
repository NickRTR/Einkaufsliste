import supabase from "$lib/supabase";

export async function get() {
    let { data: products, error } = await supabase.from("products").select('*');

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
        body: {
            products
        }
    }
}