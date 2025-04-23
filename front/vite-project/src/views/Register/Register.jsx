import { useFormik } from 'formik'
import { registerFormValidate } from '../../helpers/RegisterFormValidate'
import Swal from 'sweetalert2'
import { Link, useNavigate } from 'react-router-dom'
import styles from './Register.module.css'
import { useContext } from 'react'
import { UsersContext } from '../../context/UsersContext'

const Register = () => {
    const { registerUser } = useContext(UsersContext)
    const navigate = useNavigate()

    const formik = useFormik({
        initialValues: {
            name: "",
            email: "",
            birthdate: "",
            nDni: "",
            username: "",
            password: ""
        },
        initialErrors: {
            name: "El nombre es requerido",
            email: "Email es requerido",
            birthdate: "La fecha de nacimiento es requerida",
            nDni: "El numero DNI es requerido",
            username: "El nombre de usuario es requerido",
            password: "La contraseña es requerida"
        },
        validate: registerFormValidate,
        onSubmit: async (values) => {
            try {
                await registerUser(values)
                Swal.fire({
                    icon: 'success',
                    title: 'Usuario registrado correctamente',
                })
                navigate("/login")
            } catch (err) {
                const detail = err.response?.data?.detail;
                if (typeof detail === 'string') {
                    if (detail.includes('email')) {
                        Swal.fire({
                            icon: 'error',
                            title: `El email ${formik.values.email} ya está registrado`,
                            text: "Por favor, ingrese otro email"
                        })
                    }
                    else if (detail.includes('usuario')) {
                        Swal.fire({
                            icon: 'error',
                            title: `El username ${formik.values.username} ya está registrado`,
                            text: "Por favor, ingrese otro username"
                        })
                    } else if (detail.includes('nDni')) {
                        Swal.fire({
                            icon: 'error',
                            title: `El DNI ${formik.values.nDni} ya está registrado`,
                            text: "Por favor, ingrese otro DNI"
                        })
                    }
                }
            }

        }
    })

    return (
        <form className={styles.form} onSubmit={formik.handleSubmit}>
            <h2 className={styles.title}>Formulario de registro</h2>
            <div className={styles.inputGroup}>
                <label className={styles.label}>Nombre:</label>
                <input
                    type="text"
                    name="name"
                    placeholder="Nombre"
                    onChange={formik.handleChange}
                    value={formik.values.name}
                    className={styles.input}
                />
                {formik.errors.name ?? formik.errors.name ? (
                    <label className={styles.error}>{formik.errors.name}</label>
                ) : null}
            </div>

            <div className={styles.inputGroup}>
                <label className={styles.label}>Email:</label>
                <input
                    type="text"
                    name="email"
                    placeholder="email@email.com"
                    onChange={formik.handleChange}
                    value={formik.values.email}
                    className={styles.input}
                />
                {formik.errors.email ?? formik.errors.email ? (
                    <label className={styles.error}>{formik.errors.email}</label>
                ) : null}
            </div>

            <div className={styles.inputGroup}>
                <label className={styles.label}>Fecha de nacimiento:</label>
                <input
                    type="date"
                    name="birthdate"
                    onChange={formik.handleChange}
                    value={formik.values.birthdate}
                    className={styles.input}
                />
                {formik.errors.birthdate ?? formik.errors.birthdate ? (
                    <label className={styles.error}>{formik.errors.birthdate}</label>
                ) : null}
            </div>

            <div className={styles.inputGroup}>
                <label className={styles.label}>nDni:</label>
                <input
                    type="text"
                    name="nDni"
                    placeholder="nDni"
                    onChange={formik.handleChange}
                    value={formik.values.nDni}
                    className={styles.input}
                />
                {formik.errors.nDni ?? formik.errors.nDni ? (
                    <label className={styles.error}>{formik.errors.nDni}</label>
                ) : null}
            </div>

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
                    !formik.values.name ||
                    !formik.values.email ||
                    !formik.values.birthdate ||
                    !formik.values.nDni ||
                    !formik.values.username ||
                    !formik.values.password
                }
                className={styles.button}
            >Registrarte
            </button>

            <label>
                ¿Tienes una cuenta? <Link to="/login">Iniciar sesión</Link >
            </label>
        </form>
    )
}

export default Register