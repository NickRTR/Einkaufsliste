import { createClient } from '@supabase/supabase-js';

console.log("db is called");

const res = await fetch("/api/getSession");
const data = await res.json();

const supabase = createClient(data.URL, data.KEY);

export default supabase;
