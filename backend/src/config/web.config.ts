import { env } from "process";

const webConfig = {
    port: env.HTTP_PORT || 8080,
    itemsPerPage: env.ITEMS_PER_PAGE || 5,
};

export default webConfig;
