import { Repository } from "typeorm";
import { Credential } from "../entities/Credentials.entity";
import { AppDataSource } from "../config/data-source";

export const CredentialRepository: Repository<Credential> = AppDataSource.getRepository(Credential);