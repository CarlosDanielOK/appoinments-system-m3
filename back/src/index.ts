import server from "./server";
import { PORT } from "./config/envs";
import "reflect-metadata";
import { AppDataSource } from "./config/data-source";

AppDataSource.initialize()
    .then(() => {
        console.log("DB connected successfully");
        server.listen(PORT, () => {
            console.log(`Server activo en el puerto ${PORT}`);
        });
    })
    .catch((error) => {
        console.error("Error al conectar con la base de datos", error);
    })