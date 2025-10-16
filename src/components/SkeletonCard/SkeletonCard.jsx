import Skeleton from "react-loading-skeleton"
import styles from "./SkeletonCard.module.css"

const SkeletonCard = () => {
  return (
    <div className={styles.skeletonCard}>
        <Skeleton height={"100%"} width={"100%"}/>
    </div>
  )
}

export default SkeletonCard