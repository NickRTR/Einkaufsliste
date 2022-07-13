import { createClient } from '@supabase/supabase-js';

console.log("db is called");

async function createSupabaseClient() {
    const res = await fetch("/api/getSession");
    const data = await res.json();
    return createClient(data.URL, data.KEY);
}

export default createSupabaseClient();
