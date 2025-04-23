/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect } from "react"
import Turno from "../../components/Turno/Turno"
import styles from './MisTurnos.module.css'
import { UsersContext } from "../../context/UsersContext"

const MisTurnos = () => {
    const { getUserAppointments, user, userAppointments } = useContext(UsersContext)

    useEffect(() => {
        getUserAppointments(user)
    }, [])

    return (
        <div className={styles.misturnosContenedor}>
            <div>
                <h1>Mis Turnos</h1>
            </div>
            <div className={styles.misturnos}>
                {
                    userAppointments.length > 0 ? userAppointments.map((turno) =>
                        <Turno
                            key={turno.id}
                            id={turno.id}
                            date={turno.date}
                            time={turno.time}
                            status={turno.status} />
                    ) : (
                        <h1>No hay turnos para mostrar</h1>
                    )
                }
            </div>
        </div>
    )
}

export default MisTurnos