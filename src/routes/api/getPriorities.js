import supabase from "$lib/supabase";

export async function GET() {
  let { data: priorities, error } = await supabase.from("userdata").select("priorities");

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
    body: {
      priorities: priorities[0].priorities,
    },
  };
}
