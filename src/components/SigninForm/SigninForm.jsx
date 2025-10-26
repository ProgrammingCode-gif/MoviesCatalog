import { useForm } from "react-hook-form"
import styles from "./SigninFrom.module.css"
import { supabaseClient } from "../../lib/supabase/supabaseClient"
import { useDispatch } from "react-redux"
import { initUser } from "../../store/userSlice"
import { useNavigate } from "react-router-dom"

const SigninForm = () => {
	const { register, handleSubmit, setError, formState: { errors, isSubmitting } } = useForm({defaultValues: {email: "", password: ""}})
	const dispatch = useDispatch()
	const navigate = useNavigate()

	const onSubmit = async (data) => {
		try {
			const {data: userAuthData, error: authError} = await supabaseClient.auth.signInWithPassword({email: data.email, password: data.password})
			
			if(!userAuthData || authError) throw new Error("Произошла ошибка во время аунтификации")
			const {data: user, error} = await supabaseClient.from("users").select("*").eq("id", userAuthData.user.id).single()
			if(error) throw new Error("Ошибка при получении пользователя из бд")
			dispatch(initUser({id: user.id, email: user.email, username: user.username, avatar_url: user.avatar_url}))
			navigate("/")

		} catch (error) {
			console.log(error);
			setError("email", {message: "Ошибка при входе"})
		}
	}

	return (
		<form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
			<h2 className={styles.title}>Вход</h2>
			<div className={styles.formSection}>
				<label className={styles.formLabel} htmlFor="email">Почта</label>
				<input className={styles.formInput}
					{...register("email", { required: true })}
					id="email"
					placeholder='Введите эл. почту'
					type="text"
				/>
			</div>
			<div className={styles.formSection}>
				<label className={styles.formLabel} htmlFor="password">Пароль</label>
				<input className={styles.formInput}
					{...register("password", { required: true })}
					id="password"
					placeholder='Введите пароль'
					type="text"
				/>
			</div>
			{isSubmitting}
			<button type="submit" className={styles.formBtn} disabled={!!isSubmitting}>Войти</button>
			<p>{isSubmitting && "Loading..."}</p>
			{(errors.email || errors.password || errors.name) && <p>Произошла ошибка</p>}
			<p className={styles.or}>Или</p>

		</form>
	)
}

export default SigninForm