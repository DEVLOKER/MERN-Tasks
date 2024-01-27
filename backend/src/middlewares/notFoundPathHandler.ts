import { Request, Response, NextFunction } from "express";
import { HttpStatusCode } from "#shared/types/RestAPI.js";
import { AppError } from "#middlewares/errorMiddleware.js";

export const notFoundPathHandler = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const url = req.url || req.path;
    throw new AppError(
        `Page ${url} not found on the server`,
        HttpStatusCode.NOT_FOUND
    );
};
