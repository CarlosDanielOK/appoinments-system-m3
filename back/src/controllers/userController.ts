import { Request, Response } from "express";
import { getUserService, getUserByIdService, registerUserService, loginUserService } from "../services/userService";
import { UserRegisterDTO, UserLoginDTO, UserDTO, UserCredentialDTO } from "../dtos/UserDTO";
import { User } from "../entities/User.entity";
import { catchingError } from "../utils/catchingError";


const getUsersController = async (req: Request, res: Response): Promise<void> => {
    const responseService: UserDTO[] = await getUserService();
    res.status(200).json({
        message: "Obtener listado de todos los usuarios",
        data: responseService
    })
}

const getUserByIdController = async (req: Request<{ id: string }>, res: Response): Promise<void> => {
    const { id } = req.params;
    const responseService: UserDTO = await getUserByIdService(parseInt(id, 10));
    res.status(200).json(responseService)
}

const registerUserController = async (req: Request<unknown, unknown, UserRegisterDTO>, res: Response): Promise<void> => {
    const responseService: User = await registerUserService(req.body);
    res.status(201).json({
        message: "Registro de un nuevo usuario",
        // data: responseService
    })
}

const loginUserController = async (req: Request<unknown, unknown, UserCredentialDTO>, res: Response): Promise<void> => {
    const responseService: UserLoginDTO = await loginUserService(req.body);
    res.status(200).json(responseService)
}

const userControllers = {
    getUsersController: catchingError(getUsersController),
    getUserByIdController: catchingError(getUserByIdController),
    registerUserController: catchingError(registerUserController),
    loginUserController: catchingError(loginUserController),
}

export default userControllers;