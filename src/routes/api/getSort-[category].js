import supabase from "$lib/supabase";

export async function get({ params }) {
    let { category } = params;

    // TODO: cache priorities

    let { data: priorities, error: priorityError } = await supabase.from("userdata").select("priorities");

    if (priorityError) {
        return {
            status: priorityError.status,
            body: {
                error: priorityError.message
            }
        }
    }

    priorities = priorities[0].priorities;

    if (category === "choose") {
        return {
            status: 200,
            body: {
                sort: 0
            }
        }
    };

    for (let i = 0; i <= Object.keys(priorities).length; i++) {
        if (priorities[i] === category) {
            return {
                status: 200,
                body: {
                    sort: i + 1
                }
            }
        }
    } 

    return {
        status: 500,
        body: {
            error: "Invalid category"
        }
    }
}