import dotenv from "dotenv";
dotenv.config();

import { startWebServer } from "#services/express.service.js";
import { dbConnect } from "#services/mongodb.service.js";

const startApp = (async () => {
    try {
        await startWebServer();
        await dbConnect();
    } catch (err) {
        console.log(`App starting error: ${err}`);
        process.exit(1);
    }
})();
