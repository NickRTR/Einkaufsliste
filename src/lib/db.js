import { createClient } from '@supabase/supabase-js';

let URL = import.meta.env.VITE_SUPABASE_URL;
let KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

const supabase = createClient(
  URL,
  KEY
)

export default supabase
