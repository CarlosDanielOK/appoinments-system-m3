import express, { NextFunction } from "express";
import router from "./routes";
import morgan from "morgan";
import cors from "cors";
import { Request, Response } from 'express';
import { ErrorResponse, PostgresError } from "./interfaces/IError";

const server = express();

server.use(express.json());
server.use(morgan("dev"));
server.use(cors());

server.use(router);

server.use((err: unknown, req: Request, res: Response, next: NextFunction) => {
    const error = err as PostgresError;

    const errorMessage: ErrorResponse = {
        message: "Error del servidor",
        detail: err instanceof Error ? error.detail ? error.detail : err.message : "Error desconocido",
        code: error.code,
    }
    if (error.code === 404) {
        res.status(404).json({message: errorMessage.message, detail: errorMessage.detail});
    } else {
        res.status(400).json(errorMessage);
    }
})

export default server;