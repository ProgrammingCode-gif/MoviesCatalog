import { useForm } from 'react-hook-form'
import styles from './SignupForm.module.css'
import { supabaseClient } from '../../lib/supabase/supabaseClient'
import { useDispatch } from 'react-redux'
import { initUser } from '../../store/userSlice'
import { useNavigate } from 'react-router-dom'

const SignupForm = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { register, handleSubmit, setError, formState: { errors, isSubmitting } } = useForm({
    defaultValues: { name: '', email: '', password: '' }
  })

  const onSubmit = async (formData) => {
    try {
        const { data: existingUser, error: selectError } = await supabaseClient
        .from('users')
        .select('id')
        .eq('email', formData.email)
        .single()

      if (selectError && selectError.code !== 'PGRST116') {
        throw selectError
      }

      if (existingUser) {
        setError('email', { message: 'Пользователь с такой почтой уже существует' })
        throw new Error("Пользлватель с такой почто уже зарегистрирован")
      }
      const { data: { user }, error: SignUpError } = await supabaseClient.auth.signUp({ email: formData.email, password: formData.password })

      if (SignUpError) throw SignUpError
      if (!user) throw new Error("User not created");

      const { error } = await supabaseClient.from("users").insert({
        id: user.id,
        username: formData.name,
        avatar_url: null,
        email: formData.email
      })

      if (error) throw new Error(error)
      dispatch(initUser({id: user.id, username: formData.name, avatar_url: null, email: formData.email}))
      navigate("/")
    } catch (error) {
      console.log("Ошибка при регистрации")
      setError("root", {message: "Что то пошло не так"})
      console.error(error)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
      <h2 className={styles.title}>Регистрация</h2>
      <div className={styles.formSection}>
        <label className={styles.formLabel} htmlFor="username">Имя пользователя:</label>
        <input className={styles.formInput}
          {...register("name", { required: true })}
          id="username"
          placeholder='Введите имя пользователя'
          type="text"
        />
      </div>
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
      <button type="submit" className={styles.formBtn} disabled={!!isSubmitting}>Зарегестрироваться</button>
      {(errors.email || errors.password || errors.name) && <p>Произошла ошибка</p>}
      <p className={styles.or}>Или</p>

    </form>
  )
}

export default SignupForm