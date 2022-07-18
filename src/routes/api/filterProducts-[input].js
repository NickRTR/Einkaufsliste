import supabase from "$lib/supabase";

export async function get({ params }) {
    const { input } = params;
    
    const { data: productTitles, error } = await supabase.from("products").select("title");

    if (error) {
        console.error(error.message);
        return {
            status: error.status,
            body: {
                error: error.message
            }
        }
    }

    function filterProductTitles() {
        let filteredProductTitles = [];
        for (let i in productTitles) {
            let title = productTitles[i].title;
            if (title.toLowerCase().startsWith(input.toLowerCase()) || title.toLowerCase().includes(input.toLocaleLowerCase())) {
                filteredProductTitles = [...filteredProductTitles, title];
            }
        }
        if (filteredProductTitles.length === 0) {
            return [];
        }
        return filteredProductTitles;
    }

    const { data: filteredProducts } = await supabase.from("products").select("*").filter("title", "in", `(${filterProductTitles()})`);

    return {
        status: 200,
        body: {
            filteredProducts
        }
    }
}