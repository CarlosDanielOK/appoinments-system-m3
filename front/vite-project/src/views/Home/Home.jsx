//import Navbar from "../../components/NavBar/Navbar"
import styles from './Home.module.css'

function Home() {
    return (
        <div className={styles.contenedorBienvenida}>
            <h1 className={styles.tituloBienvenida}>Bienvenid@ a Dan Enterprises</h1>
            <p className={styles.textoBienvenida}>¿Tienes dificultad para aprender a programar? No te preocupes, somos expertos en la industria tecnológica. Tenemos clases de programación sobre todos los lenguajes, JavaScript, C, C++, Java, Python, Kotlin, Ruby, HTML, CSS, React, Nodejs, Express, Django, SQL, y mucho más. Reserva tu clase personalizada.</p>
        </div>
    )
}

export default Home