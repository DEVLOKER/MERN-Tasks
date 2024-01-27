import dotenv from "dotenv";
dotenv.config(); // {path: `./.env.${process.env.NODE_ENV}`}

import { startWebServer } from "#services/express.service.js";
import { dbConnect } from "#services/mongodb.service.js";

(async () => {
    try {
        await startWebServer();
        await dbConnect();
    } catch (err) {
        console.log(`App starting error: ${err}`);
        process.exit(1);
    }
})();
