import { useForm } from 'react-hook-form'
import styles from './SignupForm.module.css'
import { supabaseClient } from '../../lib/supabase/supabaseClient'

const SignupForm = () => {
  const {register, handleSubmit, reset, formState: {errors, isSubmitting}} = useForm({
    defaultValues: {name: '', email: '', password: ''}
  })
  const onSubmit = async (formData) => {
    
    console.log(formData.email, formData.password);
    try {
      const { data: { user }, error: SignUpError } = await supabaseClient.auth.signUp({email: formData.email, password: formData.password})
      console.log(user);
      
      if(SignUpError) throw SignUpError
      if (!user) throw new Error("User not created");

      if(user) {
        
        const {error} = await supabaseClient.from("users").insert({
          id: user.id,
          username: formData.name,
          avatar_url: null,
          email: formData.email
        })
        if(error) {
          console.log("Ошибка при регистрации", error)
          throw new Error(error)
        }
      }
      
    } catch (error) {
      console.log("Ошибка при регистрации")

      console.error(error)
    }
  }
  
  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
      <h2 className={styles.title}>Регистрация</h2>

      <div className={styles.formSection}>
        <label className={styles.formLabel} htmlFor="username">Имя пользователя:</label>
        <input className={styles.formInput} 
          {...register("name", {required: true})} 
          id="username"
          placeholder='Введите имя пользователя' 
          type="text" 
        />
      </div>
      <div className={styles.formSection}>
        <label className={styles.formLabel} htmlFor="email">Почта</label>
        <input className={styles.formInput} 
          {...register("email", {required: true})} 
          id="email" 
          placeholder='Введите эл. почту' 
          type="text"
        />
      </div>
      <div className={styles.formSection}>
        <label className={styles.formLabel} htmlFor="password">Пароль</label>
        <input className={styles.formInput} 
          {...register("password", {required: true})}
          id="password" 
          placeholder='Введите пароль' 
          type="text" 
        />
      </div>
      {isSubmitting}
      <button type="submit" className={styles.formBtn} disabled={!!isSubmitting}>Зарегестрироваться</button>
      <p className={styles.or}>Или</p>

    </form>
  )
}

export default SignupForm