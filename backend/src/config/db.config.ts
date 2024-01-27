import { env } from "process";
import dotenv from "dotenv";
dotenv.config();

const dbConfig = {
    host: env.DB_HOST,
    port: env.DB_PORT,
    database: env.DB_NAME,
    user: env.DB_USER,
    password: env.DB_PASSWORD,
    url: `mongodb://${env.DB_HOST}:${env.DB_PORT}/${env.DB_NAME}`,
};

export default dbConfig;
