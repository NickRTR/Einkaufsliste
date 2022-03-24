import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const URL = process.env.SUPABASE_URL;
const KEY = process.env.SUPABASE_KEY;

const supabase = createClient(
  URL,
  KEY
)

export default supabase
