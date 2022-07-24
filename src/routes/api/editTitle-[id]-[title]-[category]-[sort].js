import supabase from "$lib/supabase";

export async function GET({ params }) {
  let { id, title, category, sort } = params;

  const { error } = await supabase.from("products").update({ title, category, sort }).eq("id", id);

  if (error) {
    console.error(error.message);
    return {
      status: error.status,
      body: {
        error: error.message,
      },
    };
  }

  return {
    status: 200,
  };
}
