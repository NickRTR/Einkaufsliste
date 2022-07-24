import supabase from "$lib/supabase";

export async function GET({ params }) {
  let { id, type } = params;

  const { error } = await supabase.from("products").update({ type }).eq("id", id);

  if (error) {
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
