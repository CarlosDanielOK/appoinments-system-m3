import e from "express";
import { AppointmentRegisterDTO } from "../dtos/AppointmentDTO";
import { Status } from "../interfaces/IAppointment";
import { time } from "console";
import { getUserByIdService } from "./userService";
import { AppointmentRepository } from "../repositories/Appointment.Repository";
import { Appointment } from "../entities/Appointments.entity";
import { CustomError } from "../utils/customError";

export const getAppointmentService = async (): Promise<Appointment[]> => {
    const appointmentFound = await AppointmentRepository.find();
    if (appointmentFound.length === 0) {
        throw new CustomError(404, "No hay citas registradas");
    } else {
        return appointmentFound;
    }

}

export const getAppointmentByIdService = async (id: string): Promise<Appointment | null> => {
    const appointmentFound = await AppointmentRepository.findOne({
        where: {
            id: parseInt(id, 10)
        }
    })
    if (!appointmentFound) {
        throw new CustomError(404, `La cita con id ${id} no existe`);
    } else {
        return appointmentFound;
    }
}

export const registerAppointmentService = async (appointmentData: AppointmentRegisterDTO): Promise<Appointment> => {
    await getUserByIdService(appointmentData.userId);
    AppointmentRepository.validateAllowAppointment(appointmentData.date, appointmentData.time)
    await AppointmentRepository.validateExistingAppointment(appointmentData.userId, appointmentData.date, appointmentData.time)

    const newAppoinment = AppointmentRepository.create({
        date: appointmentData.date,
        time: appointmentData.time,
        user: {
            id: appointmentData.userId
        }
    })
    return await AppointmentRepository.save(newAppoinment);
}

export const cancelStatusAppointmentService = async (id: string): Promise<void> => {
    const appointmentFound = await AppointmentRepository.findOne({
        where: {
            id: parseInt(id, 10)
        }
    });

    if (!appointmentFound) {
        throw new CustomError(404, `La cita con id ${id} no existe`);
    }
    appointmentFound.status = Status.cancelled;
    await AppointmentRepository.save(appointmentFound);
}