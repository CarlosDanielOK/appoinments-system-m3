import { Appointment } from "../entities/Appointments.entity";
import { AppDataSource } from "../config/data-source";

export const AppointmentRepository = AppDataSource.getRepository(Appointment).extend({
    validateAllowAppointment: function (date: Date, time: string): void {
        const [hours, minutes] = time.split(":").map(Number);
        const appointmentDate = new Date(date);
        appointmentDate.setHours(hours, minutes, 0);
        const today = new Date();
        
        const diffMiliSeconds = today.getTime() - appointmentDate.getTime();
        const diffInHours = diffMiliSeconds / (1000 * 60 * 60);
        if(diffInHours > 24) {
            throw new Error("Las citas deben agendarse con al menos 24 horas de anticipación");
        }

        const appointmentDateArg = new Date(appointmentDate.getTime() - 3 * 60 * 60 * 1000);
        const nowInArg = new Date(new Date().getTime() - 3 * 60 * 60 * 1000);
        if (appointmentDateArg < nowInArg) {
            throw new Error("No se puede agendar un turno para una fecha anterior a la actual");
        }

        const dayOnWeek = appointmentDateArg.getUTCDay();
        if (dayOnWeek === 5 || dayOnWeek === 6) {
            throw new Error("No se pueden agendar turnos los fines de semana");
        }

        if ((hours < 8 || hours >= 18 && minutes > 0)) {
            throw new Error("Los turnos debene agendarse entre las 8:00 y las 18:00");
        }
    },

    validateExistingAppointment: async function (userId: number, date: Date, time: string): Promise<void> {
        const appointmentFound = await this.findOne({
            where: {
                user: {
                    id: userId
                },
                date: date,
                time: time
            }
        })
        if(appointmentFound) {
            throw new Error(`El usuario con id ${userId} ya tiene un turno agendado para la fecha ${date} y hora ${time}`);
        }
    }
})