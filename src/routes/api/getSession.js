import dotenv from 'dotenv';

export async function get() {
    dotenv.config();
    
    const URL = process.env["SUPABASE_URL"];
    const KEY = process.env["SUPABASE_ANON_KEY"];

    return {
        status: 200,
        body: {
            URL,
            KEY
        }
    }
}