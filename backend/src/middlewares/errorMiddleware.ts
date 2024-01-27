import { NextFunction, Request, Response } from "express";
import { HttpStatusCode, APIErrorResponse } from "#shared/types/RestAPI.js";
import { prepareErrorResponse } from "#utils/apiResponse.js";

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
    res.status(code);

    if (process.env.NODE_ENV === "production") {
        if (code === HttpStatusCode.NOT_FOUND) {
            // if (req.accepts("html")) {
            //     return res.sendFile("404.html");
            // }
            if (req.accepts("json")) {
                return res.json(errorResponse);
            }
            return res.type("txt").send(JSON.stringify(message));
        }
    }
    res.json(errorResponse);
};
