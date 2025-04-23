/* eslint-disable no-unused-vars */
import PropTypes from 'prop-types'
import styles from './Turno.module.css'
import { UsersContext } from '../../context/UsersContext'
import { useContext } from 'react'
import Swal from 'sweetalert2'

const Turno = ({ id, date, time, status }) => {
    const { cancelAppointment } = useContext(UsersContext)
    const handleCancel = async () => {
        try {
            await cancelAppointment(id)
            Swal.fire({
                icon: "warning",
                color: "red",
                title: "Turno cancelado correctamente"
            })
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Error al cancelar el turno",
            })
        }
    }

    return (
        <div className={styles.cardContainer}>
            <div className={styles.header}>
                <h3 className={styles.title}>Turno #{id}</h3>
                <span className={`${styles.status} ${status === "active" ? styles.statusActive : status === "cancelled" ? styles.statusCancelled : ''}`}>{status}</span>
            </div>
            <div>
                <p className={styles.info}>Fecha: <span className={styles.infoLabel}>{date}</span></p>
                <p className={styles.info}>Hora: <span className={styles.infoLabel}>{time}</span></p>
            </div>
            <button
                onClick={handleCancel}
                disabled={status === "cancelled"}>Cancelar turno</button>
        </div>
    )
}

Turno.propTypes = {
    id: PropTypes.number.isRequired,
    date: PropTypes.string.isRequired,
    time: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired
}

export default Turno