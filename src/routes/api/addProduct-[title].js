import supabase from "$lib/supabase";

export async function get({ params }) {
    const { title } = params;

    const { data, error } = await supabase.from("products").insert([{title, uuid: supabase.auth.user().id}]);

    if (error) {
        console.log(error);
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