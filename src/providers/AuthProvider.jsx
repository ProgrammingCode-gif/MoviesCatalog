import { useEffect } from "react"
import { supabaseClient } from "../lib/supabase/supabaseClient"
import { useDispatch } from "react-redux"
import { initUser } from "../store/userSlice"

function AuthProvider({children}) {
    const dispatch = useDispatch()
    useEffect(() => {
        const init = async () => {
            try {
                const {data: userAuthData, AuthError} = await supabaseClient.auth.getSession()
                if(AuthError) throw new Error(AuthError)                

                const {data: user, error} = await supabaseClient.from("users").select("*").eq("id", userAuthData.session.user.id).single()
                if(error) throw new Error(error)
                
                dispatch(initUser(user))
                
            } catch (error) {
                console.log(error)
            }
        }
        init()
    }, [])
    
    return (
        <>
            {children}
        </>
    )
}

export default AuthProvider