import { NextFunction, Request, Response, Router } from "express";
import { AppointmentRegisterDTO } from "../dtos/AppointmentDTO";
import appointmentsControllers from "../controllers/appointmentController";

const appointmentRouter: Router = Router();

appointmentRouter.get("/", (req: Request, res: Response, next: NextFunction) => appointmentsControllers.getAppointmentsController(req, res, next));

appointmentRouter.get("/:id", (req: Request<{ id: string }>, res: Response, next: NextFunction) => appointmentsControllers.getAppointmentByIdController(req, res, next));

appointmentRouter.post("/schedule", (req: Request<unknown, unknown, AppointmentRegisterDTO>, res: Response, next: NextFunction) => appointmentsControllers.registerAppointmentController(req, res, next));

appointmentRouter.put("/cancel/:id", (req: Request<{ id: string }>, res: Response,next: NextFunction) => appointmentsControllers.cancelStatusAppointmentController(req, res, next));

export default appointmentRouter;