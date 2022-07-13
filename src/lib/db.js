import { createClient } from '@supabase/supabase-js';
import { browser } from '$app/env';

let URL = import.meta.env.VITE_SUPABASE_URL;
let KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;
// if production, get KEY from Vercel
if (import.meta.env.MODE === 'production' || process.env.MODE === 'production' && !browser) {
    URL = process.env.SUPABASE_URL;
    KEY = process.env.SUPABASE_ANON_KEY;
}

const supabase = createClient(URL, KEY);

export default supabase;