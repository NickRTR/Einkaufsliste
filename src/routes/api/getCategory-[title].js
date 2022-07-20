import supabase from "$lib/supabase";

export async function get({ params }) {
    let { title } = params;
    title = title.toLowerCase();

    // TODO: cache categories and priorities

    let { data: categories, error: categoryError } = await supabase.from("userdata").select("categories");    

    if (categoryError) {
        return {
            status: categoryError.status,
            body: {
                error: categoryError.message
            }
        }
    }

    let { data: priorities, error: priorityError } = await supabase.from("userdata").select("priorities");

    if (priorityError) {
        return {
            status: priorityError.status,
            body: {
                error: priorityError.message
            }
        }
    }

    categories = categories[0].categories;
    priorities = priorities[0].priorities;

    // first, check if there's an explicit fit
    for (let i = 0; i < priorities.length; i++) {
        // console.log(priorities[i]);
        if (categories[priorities[i]].includes(title)) {
            let category = priorities[i];
            return {
                status: 200,
                body: {
                    category
                }
            }
        }
    }

    // then check if there's an other not perfect fitting entry
    for (let i = 0; i < priorities.length; i++) {
        for (let y = 0; y < categories[priorities[i]].length; y++) {
            let product = categories[priorities[i]];
            if (product[y].includes(title) || title.includes(product[y])) {
                let category = priorities[i];
                return {
                    status: 200,
                    body: {
                        category
                    }
                }
            }
        }
    }

    return {
        status: 200,
        body: {
            category: "choose"
        }
    }
}