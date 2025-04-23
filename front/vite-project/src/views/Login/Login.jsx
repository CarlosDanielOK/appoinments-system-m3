/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useFormik } from 'formik'
import { loginFormValidate } from '../../helpers/loginFormValidate'
import Swal from 'sweetalert2'
import { Link, useNavigate } from 'react-router-dom'
import styles from './Login.module.css'
import { useContext } from 'react'
import { UsersContext } from '../../context/UsersContext'

const Login = () => {
    const { loginUser } = useContext(UsersContext)
    const navigate = useNavigate()

    const formik = useFormik({
        initialValues: {
            username: "",
            password: ""
        },
        initialErrors: {
            username: "El nombre es requerido",
            password: "La contraseña es requerida"
        },
        validate: loginFormValidate,
        onSubmit: async (values) => {
            try {
                await loginUser(values)
                Swal.fire({
                    icon: 'success',
                    title: 'Usuario logueado correctamente',
                })
                navigate("/")
            } catch (error) {
                Swal.fire({
                    icon: 'error',
                    title: 'Usuario o contraseña incorrectos',
                    text: 'Por favor, vuelva a intentarlo'
                })
            }
        }
    })

    return (
        <form className={styles.loginForm} onSubmit={formik.handleSubmit}>
            <h2 className={styles.loginTitle}>Formulario de login</h2>

            <div className={styles.inputGroup}>
                <label className={styles.label}>Username:</label>
                <input
                    type="text"
                    name="username"
                    placeholder="Nombre de usuario"
                    onChange={formik.handleChange}
                    value={formik.values.username}
                    className={styles.input}
                />
                {formik.errors.username ?? formik.errors.username ? (
                    <label className={styles.error}>{formik.errors.username}</label>
                ) : null}
            </div>

            <div className={styles.inputGroup}>
                <label className={styles.label}>Password:</label>
                <input
                    type="password"
                    name="password"
                    placeholder="Contraseña"
                    onChange={formik.handleChange}
                    value={formik.values.password}
                    className={styles.input}
                />
                {formik.errors.password ?? formik.errors.password ? (
                    <label className={styles.error}>{formik.errors.password}</label>
                ) : null}
            </div>

            <button
                type="submit"
                disabled={
                    Object.keys(formik.errors).length > 0 ||
                    !formik.values.username ||
                    !formik.values.password
                }
                className={styles.submitButton}
            >Iniciar sesión
            </button>

            <label>
                ¿No tienes una cuenta? <Link to="/register">Regístrate</Link >
            </label>
        </form>
    )
}

export default Login