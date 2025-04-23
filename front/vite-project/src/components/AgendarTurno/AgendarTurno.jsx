import { useFormik } from "formik"
import { dateFormValidates } from "../../helpers/dateFormValidates"
import Swal from "sweetalert2"
import { useContext } from "react"
import { UsersContext } from "../../context/UsersContext"
import styles from './AgendarTurno.module.css'

const AgendarTurno = () => {
    const { createdAppointment } = useContext(UsersContext)

    const formik = useFormik({
        initialValues: {
            date: '',
            time: ''
        },
        validate: dateFormValidates,
        initialErrors: {
            date: 'La fecha es obligatoria',
            time: 'La hora es obligatoria'
        },
        onSubmit: async (values) => {
            try {
                await createdAppointment(values)
                Swal.fire({
                    icon: 'success',
                    title: 'Turno agendado correctamente',
                })
            } catch (error) {
                Swal.fire({
                    icon: 'error',
                    title: `${error.response.data.detail}`,
                    text: 'Error al agendar turno',
                })
            } finally {
                formik.resetForm()
            }
        }
    })

    return (
        <div className={styles.formContainer}>
            <h1 className={styles.formTitle}>Agendar Turno</h1>
            <form onSubmit={formik.handleSubmit}>
                <div className={styles.formFieldContainer}>
                    <label className={styles.formLabel}>Fecha</label>
                    <input
                        id="date"
                        type="date"
                        name="date"
                        min={new Date().toISOString().split('T')[0]}
                        onChange={formik.handleChange}
                        value={formik.values.date}
                        className={styles.formInput}
                    />
                </div>

                <div className={styles.formFieldContainer}>
                    <label className={styles.formLabel}>Hora</label>
                    <input
                        id="time"
                        type="time"
                        name="time"
                        onChange={formik.handleChange}
                        value={formik.values.time}
                        className={styles.formInput}
                    />
                </div>

                <button
                    type="submit"
                    disabled={Object.keys(formik.errors).length > 0}
                    className={styles.submitButton}
                >Agendar turno
                </button>
            </form>
        </div>
    )
}

export default AgendarTurno