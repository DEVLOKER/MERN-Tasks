import { NextFunction, Request, Response } from "express";
import { HttpStatusCode, APIErrorResponse } from "#shared/types/RestAPI.js";
import { prepareErrorResponse } from "#utils/apiResponse.js";
import path from "path";

export class AppError extends Error {
    public statusCode: HttpStatusCode;
    constructor(reason: string, code: HttpStatusCode) {
        super(reason);
        Object.setPrototypeOf(this, new.target.prototype);
        this.name = Error.name;
        this.statusCode = code;
        Error.captureStackTrace(this);
    }
}

export const APIErrorHandler = (
    error: AppError,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const code: number =
        error.statusCode || HttpStatusCode.INTERNAL_SERVER_ERROR;
    const message: string = error.message || "Something went wrong!";
    console.log(message);
    const errorResponse: APIErrorResponse = prepareErrorResponse({
        code,
        message,
        error,
    });
    res.status(code); //.json(errorResponse)

    if (code === HttpStatusCode.NOT_FOUND) {
        if (req.accepts("html")) {
            //     return res.sendFile(path.join("views", "404.html"))
            if (process.env.NODE_ENV === "production")
                return res.sendFile(
                    path.resolve(
                        __dirname,
                        "..",
                        "..",
                        "..",
                        "build",
                        "frontend",
                        "index.html"
                    )
                );
        }
        if (req.accepts("json")) {
            return res.json(errorResponse);
        } else {
            return res.type("txt").send(JSON.stringify(message));
        }
    } else {
        res.json(errorResponse);
    }
};
