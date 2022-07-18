import supabase from "$lib/supabase";

export async function get({ params }) {
    const { title } = params;

    
    
    title = title.toLowerCase();
    // first, check if there's an explicit fit
    for (let i = 0; i < priorities.length; i++) {
        if (updatedCategories[priorities[i]].includes(input)) {
            let category = priorities[i];
            return category;
        }
    }
    if (input.length <= 3) {
        return "choose";
    }

    // then check if there's an other not perfect fitting entry
    for (let i = 0; i < priorities.length; i++) {
        for (let y = 0; y < updatedCategories[priorities[i]].length; y++) {
            let product = updatedCategories[priorities[i]];
            if (product[y].includes(input) || input.includes(product[y])) {
                let category = priorities[i];
                return category;
            }
        }
    }
    return "choose";



    const { data, error } = await supabase.from("products").insert([{title, uuid: supabase.auth.user().id, category}]);

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