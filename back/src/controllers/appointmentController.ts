import { Request, Response } from "express";
import { AppointmentRegisterDTO } from "../dtos/AppointmentDTO";
import appointmentRouter from '../routes/appointmentsRouter';
import { getAppointmentService, getAppointmentByIdService, registerAppointmentService, cancelStatusAppointmentService } from "../services/appointmentService";
import { Appointment } from "../entities/Appointments.entity";
import { catchingError } from "../utils/catchingError";

const getAppointmentsController = async (req: Request, res: Response): Promise<void> => {
    const responseService = await getAppointmentService();
    res.status(200).json({
        message: "Obtener el listado de todos los turnos de todos los usuarios",
        data: responseService
    })
}

const getAppointmentByIdController = async (req: Request<{ id: string }>, res: Response): Promise<void> => {
    const { id } = req.params;
    const responseService = await getAppointmentByIdService(id);
    res.status(200).json({
        message: "Obtener el detalle de un turno específico",
        data: responseService
    })
}

const registerAppointmentController = async (req: Request<unknown, unknown, AppointmentRegisterDTO>, res: Response): Promise<void> => {
    const responseService: Appointment = await registerAppointmentService(req.body);
    res.status(201).json({
        message: "Cita agendada con exito",
        data: responseService
    })
}

const cancelStatusAppointmentController = async (req: Request<{ id: string }>, res: Response): Promise<void> => {
    const { id } = req.params;
    const responseService = await cancelStatusAppointmentService(id);
    res.status(200).json({
        message: "Cita cancelada con exito",
        data: responseService
    })
}

const appointmentsControllers = {
    getAppointmentsController: catchingError(getAppointmentsController),
    getAppointmentByIdController: catchingError(getAppointmentByIdController),
    registerAppointmentController: catchingError(registerAppointmentController),
    cancelStatusAppointmentController: catchingError(cancelStatusAppointmentController),
}

export default appointmentsControllers;