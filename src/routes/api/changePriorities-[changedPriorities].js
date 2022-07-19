import supabase from "$lib/supabase";   

export async function get({ params }) {
    const { changedPriorities } = params;

    const priorities = changedPriorities.split(",");

    const { error } = await supabase.from("userdata").update({priorities}).eq("uuid", supabase.auth.user().id);

    // TODO: change sort value of every product
    
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