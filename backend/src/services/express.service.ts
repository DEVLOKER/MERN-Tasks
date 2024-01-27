import express, { Express, Application } from "express";
// import middlewares
import { loggerHandler } from "#middlewares/loggerMiddleware.js";
import { APIErrorHandler } from "#middlewares/errorMiddleware.js";
import { notFoundPathHandler } from "#middlewares/notFoundPathHandler.js";
// import routes
import TaskRouter from "#routes/task.route.js";

// import config
import config from "#config/config.js";

// import utils
import http from "http";
import { AddressInfo } from "net";
import path from "path";

// use middleware
const setupMiddleware = (app: Application) => {
    app.use(loggerHandler);
    app.use(express.json({ limit: "5mb" }));
    app.use(
        express.urlencoded({
            limit: "5mb",
            extended: true,
            parameterLimit: 50000,
        })
    );

    if (process.env.NODE_ENV === "production") {
        app.use(
            "/",
            express.static(path.join(__dirname, "..", "..", "frontend"))
        );

        // ^/$|/index(.html)?
        app.get("/", (req, res) => {
            res.sendFile("index.html");
        });
    }
};

// use routes
const setupRoutes = (app: Application) => {
    app.use("/api/v1/tasks", TaskRouter);
    app.all("*", notFoundPathHandler);
    app.use(APIErrorHandler);
    return app;
};

// launch server
const startServer = async (app: Application) => {
    const webServer = http.createServer(app);

    webServer
        .listen(config.HTTP_PORT, () => {
            const addr = webServer.address() as AddressInfo;
            console.log(
                `🚀 Web Server is running at http://${addr.address}:${addr.port}`
            );
            Promise.resolve(webServer);
        })
        .once("error", (err) => {
            if (err) {
                console.log(
                    `There was an error starting the web server: ${err}`
                );
                Promise.reject(err);
            }
        });

    return webServer;
};

const app: Application = express();
let webServer: http.Server<
    typeof http.IncomingMessage,
    typeof http.ServerResponse
>;
export const startWebServer = async () => {
    setupMiddleware(app);
    setupRoutes(app);
    webServer = await startServer(app);
    return app;
};

export const stopWebServer = () => {
    webServer.close();
};

export default app;
