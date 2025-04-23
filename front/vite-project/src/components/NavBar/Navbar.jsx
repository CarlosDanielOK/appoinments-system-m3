import { Link, useNavigate } from "react-router-dom";
import Swal from 'sweetalert2'
import styles from './Navbar.module.css'
import { useContext } from "react";
import { UsersContext } from "../../context/UsersContext";
import logo from '../../assets/img/BestLanguages.png'

function Navbar() {
    const { logOutUser } = useContext(UsersContext)

    const navigate = useNavigate()
    const handleLogOut = () => {
        logOutUser()
        Swal.fire({
            icon: 'warning',
            title: 'Sesión cerrada correctamente',
        })
        navigate('/login')
    }
    return (
        <div>
            <nav className={styles.nav}>
                <ul className={styles.ul}>
                    <li className={styles.logo}>
                        <Link to="/" className={styles.link}>
                            <img src={logo} alt="Logo" className={styles.logoImg} />
                        </Link>
                    </li>
                    <li className={styles.li}>
                        <Link to="/" className={styles.link}>Home</Link>
                    </li>
                    <li className={styles.li}>
                        <Link to="/misturnos" className={styles.link}>Mis Turnos</Link>
                    </li>
                    <li className={styles.li}>
                        <Link to="/agendarturno" className={styles.link}>Agendar Turno</Link>
                    </li>
                    <li className={styles.li}>
                        <Link onClick={handleLogOut} className={styles.link}>Cerrar sesión</Link>
                    </li>
                </ul>
            </nav>
        </div>
    );
}

export default Navbar;