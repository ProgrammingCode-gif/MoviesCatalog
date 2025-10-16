import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL
const SUPABASE_API_KEY = import.meta.env.VITE_SUPABASE_KEY

export const supabaseClient = createClient(SUPABASE_URL, SUPABASE_API_KEY)