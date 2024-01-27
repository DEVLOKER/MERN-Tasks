import { env } from "process";

const Config = {
    HTTP_PORT: env.HTTP_PORT || 8080,
    DB_URL: env.DB_URL,
    ITEMS_PER_PAGE: env.ITEMS_PER_PAGE || 5,
};

export default Config;
