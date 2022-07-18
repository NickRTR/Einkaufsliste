import supabase from "$lib/supabase";
import { toast } from "@zerodevx/svelte-toast";

export async function get({ params }) {
    let { id, checked } = params;

    let { error } = await supabase.from("products").update({"checked": (checked == "false")}).eq("id", id);

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