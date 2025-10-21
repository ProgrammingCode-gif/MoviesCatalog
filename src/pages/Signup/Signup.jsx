import SignupForm from "../../components/SignupForm/SignupForm"
import styles from "./Signup.module.css"

const Signup = () => {
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