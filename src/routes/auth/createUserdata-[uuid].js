import supabase from "$lib/supabase";

export async function get({ params }) {
    const { uuid } = params;

    let { error } = await supabase.from("userdata").insert([{uuid}]);

    if (error) {
        return {
            status: error.status,
            body: {
                error: error.message
            }
        }
    }

    return {
        status: 200
    }
}