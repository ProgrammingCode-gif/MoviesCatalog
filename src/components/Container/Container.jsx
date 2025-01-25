import styles from './Container.module.css'

const Container = ({children, width = 1280, className = ''}) => {
  return (
    <div style={{maxWidth: width}} className={`${styles.container} ${className}`}>{children}</div>
  )
}

export default Container