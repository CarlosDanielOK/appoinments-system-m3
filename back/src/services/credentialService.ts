import { EntityManager } from "typeorm";
import { Credential } from "../entities/Credentials.entity";
import { CredentialRepository } from "../repositories/Credential.Repository";


const encriptarPassword = async (password: string): Promise<string> => {
    const encoder = new TextEncoder();
    const data = encoder.encode(password);
    const hash = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hash));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    return hashHex;
}

const checkUserExist = async (username: string): Promise<void> => {
    const credentialFound: Credential | null = await CredentialRepository.findOne({ where: { username } });
    if (credentialFound) {
        throw new Error(`El usuario ${username} ya existe. Intente con un nombre de usuario diferente.`);
    }
}

export const getCredentialService = async (entityManager: EntityManager, username: string, password: string): Promise<Credential> => {
    await checkUserExist(username);
    const passwordEncriptado = await encriptarPassword(password);
    const objetoCredenciales: Credential = entityManager.create(Credential, {
        username: username,
        password: passwordEncriptado,
    })

    return await entityManager.save(objetoCredenciales);
}

export const checkUserCredentials = async (username: string, password: string): Promise<number | undefined> => {
    const credentialFound: Credential | null = await CredentialRepository.findOne({ where: { username } });
    if (!credentialFound) {
        throw new Error(`Usuario o contraseña incorrectos`);
    } else {
        const passwordEncriptado = await encriptarPassword(password);
        if(credentialFound?.password != passwordEncriptado) {
            throw new Error(`Usuario o contraseña incorrectos`);
        } else {
            console.log(credentialFound);
            return credentialFound.id;
        }
    }
}