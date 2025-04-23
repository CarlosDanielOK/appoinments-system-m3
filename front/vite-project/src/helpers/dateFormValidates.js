const isValidTime = (time) => {
    const [hour, minute] = time.split(':').map(Number)
    const totalMinutes = hour * 60 + minute
    const startTime = 8 * 60
    const endTime = 18 * 60

    return totalMinutes >= startTime && totalMinutes <= endTime
}

export const dateFormValidates = (inputs) => {
    const errors = {}
    const { date, time } = inputs
    const selectDateTime = new Date(`${date}T${time}`)
    const now = new Date()
    const twentyFourHoursLater = new Date(now.getTime() + 24 * 60 * 60 * 1000)

    if (!date) {
        errors.date = 'La fecha es obligatoria'
    } else if (selectDateTime < now) {
        errors.date = 'No se puede seleccionar una fecha anterior a la actual'
    } else if (selectDateTime < twentyFourHoursLater) {
        errors.date = 'No se pueden agendar turnos con menos de 24 horas de anticipación'
    } else if (selectDateTime.getDay() === 0 || selectDateTime.getDay() === 6) {
        errors.date = 'No se pueden agendar turnos para fines de semana'
    }

    if (!time) {
        errors.time = 'La hora es obligatoria'
    } else if (!isValidTime(time)) {
        errors.time = 'El horario de atención es de 8:00hs a 18:00hs'
    }

    return errors
}