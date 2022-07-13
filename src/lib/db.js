import { createClient } from '@supabase/supabase-js';

async function production() {
    const res = await fetch("/api/getEnv");
    const data = await res.json();

    URL = data.URL;
    KEY = data.KEY;
}

let URL = import.meta.env.VITE_SUPABASE_URL;
let KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;
// if production, get KEY from Vercel
if (import.meta.env.MODE === 'production') {
    console.log(process.env.SUPABASE_URL);
    production();
}

const supabase = createClient(URL, KEY);

export default supabase;