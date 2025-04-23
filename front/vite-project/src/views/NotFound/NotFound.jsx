import { Link } from "react-router-dom"
import styles from './NotFound.module.css'

const NotFound = () => {
    return (
        <div className={styles.errorContainer}>
            <h1 className={styles.errorCode}>404</h1>
            <p className={styles.errorMessage}>La página que buscas no existe</p>
            <Link to="/" className={styles.errorLink}>Volver al Home</Link>
        </div>
    )
}

export default NotFound