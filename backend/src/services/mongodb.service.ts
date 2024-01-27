import mongoose from "mongoose";
import dbConfig from "#config/db.config.js";

mongoose.set("strictQuery", false);
mongoose.set("runValidators", true);

const options = {
    autoIndex: true,
};

const dbConnect = async () => {
    try {
        mongoose.connect(dbConfig.url, options);
        mongoose.connection
            .once("open", (stream) => {
                console.log("⚡️ MongoDB connection established successfully!");
                Promise.resolve(mongoose.connection);
            })
            .on("error", (error) => {
                throw new Error(`mongodb error: ${error.message}`);
            });
    } catch (err) {
        console.log(`An error occurred when connect to mongodb: ${err}`);
        Promise.reject(err);
    }
};

export const dbDisconnect = async () => {
    try {
        await mongoose.connection.close();
    } catch (err) {
        console.log(`An error occurred when disconnect from mongodb: ${err}`);
        Promise.reject(err);
    }
};

export { dbConnect };
