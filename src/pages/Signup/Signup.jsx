import { useNavigate } from "react-router-dom"
import SignupForm from "../../components/SignupForm/SignupForm"
import styles from "./Signup.module.css"
import { useSelector } from "react-redux"
import { useEffect } from "react"

const Signup = () => {
	const user = useSelector(state => state.user)
	const navigate = useNavigate()
	
	useEffect(() => {
		if (user) {
			navigate("/")
		}
	}, [user])

	return (
		<div className={styles.layout}>
			<div className={styles.right}>
				<div className={styles.form}>
					<SignupForm />
				</div>
				<img src="/images/ChatGPT Image 19 окт. 2025 г., 22_45_39.png" alt="" />
			</div>
		</div>
	)
}

export default Signup