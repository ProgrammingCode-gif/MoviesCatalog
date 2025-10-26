import { useSelector } from "react-redux"
import SigninForm from "../../components/SignInForm/SignInForm"
import styles from "./Signin.module.css"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

const Signin = () => {
    const user = useSelector(state => state.user)
    const navigate = useNavigate()

    useEffect(() => {
        if(user) {
            navigate("/")
        }
    }, [user])

    if(user) return
    return (
        <div className={styles.layout}>
        <div className={styles.right}>
            <div className={styles.form}>
            <SigninForm />
            </div>
            <img src="/images/ChatGPT Image 19 окт. 2025 г., 22_45_39.png" alt="" />
        </div>
        </div>
    )
}

export default Signin