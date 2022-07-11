import { createClient } from '@supabase/supabase-js';

const res = await fetch("/api/getSession");
const data = await res.json();

const supabase = createClient(data.URL, data.KEY);

export default supabase;
