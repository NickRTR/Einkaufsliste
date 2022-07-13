// import { createClient } from '@supabase/supabase-js';

// console.log("db is called");

// async function createSupabaseClient() {
//     const res = await fetch("/api/getSession");
//     const data = await res.json();
//     return createClient(data.URL, data.KEY);
// }

// export default createSupabaseClient();

import { createClient } from '@supabase/supabase-js';

let URL = import.meta.env.VITE_SUPABASE_URL;
let KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

const supabase = createClient(
  URL,
  KEY
)

export default supabase;