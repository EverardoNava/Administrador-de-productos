import express from "express";
import colors from "colors";
import cors, { CorsOptions } from "cors";
import morgan from "morgan";
import swaggerUI from "swagger-ui-express";
import swaggerSpec, { swaggerUiOptions } from "./config/swagger";
import router from "./router";
import db from "./config/db";

//Conectar a base de datos
export async function connectDB() {
    try {
        await db.authenticate();
        db.sync();
        // console.log(colors.bgGreen.bold("Conexion exitosa al conectar a la base de datos"));
    } catch (error) {
        // console.log(error);
        console.log(colors.bgRed.bold("Hubo un error al conectar a la base de datos"));
    }
}

connectDB();

//Instanica de express
const server = express();

//Permitir conexiones
const corsOptions: CorsOptions = {
    origin: function (origin, callback) {
        if (origin === process.env.FRONTEND_URL) {
            callback(null, true);
        } else {
            callback(new Error("Error de cors"));
        }
    }
}
server.use(cors(corsOptions));

//Leer datos de formularios
server.use(express.json());

server.use(morgan("dev"));
server.use("/api/products", router);

//Docs
server.use("/docs", swaggerUI.serve, swaggerUI.setup(swaggerSpec, swaggerUiOptions));

export default server;