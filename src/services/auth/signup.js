import { supabaseClient } from "../../lib/supabase/supabaseClient"

export const signup = async (email, username, password) => {
    supabaseClient.auth.signUp({email, password})
}