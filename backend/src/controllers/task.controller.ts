import { NextFunction, Request, Response } from "express";
import TaskModel from "#models/task.model.js";
import { validationResult, ValidationError } from "express-validator";
import {
    TSearchTasksFilter,
    TSearchTasksResults,
    TTask,
} from "#shared/types/Task.js";
import { AppError } from "#middlewares/errorMiddleware.js";
import { HttpStatusCode } from "#shared/types/RestAPI.js";
import { prepareSuccessResponse } from "#utils/apiResponse.js";
import webConfig from "#config/web.config.js";

export const createTask = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const err = errors
                .array()
                .map((input: ValidationError) => input.msg);
            throw new AppError(err.toString(), HttpStatusCode.BAD_REQUEST);
        }

        const { title, description, complete } = req.body;

        const duplicate = await TaskModel.findOne({ title });
        if (duplicate)
            throw new AppError(
                `Task "${title}" already taken!`,
                HttpStatusCode.CONFLICT
            );

        const task = await TaskModel.create({ title, description, complete });
        if (task === null)
            throw new AppError(
                "Invalid data received, can't create Task!",
                HttpStatusCode.BAD_REQUEST
            );

        const successResponse = prepareSuccessResponse<TTask>({
            message: `"${task.title}" created successfully!`,
            data: task,
        });
        res.status(HttpStatusCode.CREATED_SUCCESS).json(successResponse);
    } catch (err) {
        next(err);
    }
};

export const readTask = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { id } = req.params;
        const Task = await TaskModel.findById(id);
        if (Task === null)
            throw new AppError("Task not found!", HttpStatusCode.BAD_REQUEST);
        const successResponse = prepareSuccessResponse<TTask>({
            message: `reading Task ${Task.title} successfully!`,
            data: Task,
        });
        res.status(HttpStatusCode.OK).json(successResponse);
    } catch (err) {
        next(err);
    }
};

export const readTasks = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const filter: TSearchTasksFilter = req.query;

        let query = {};
        if (filter.title)
            query = {
                ...query,
                title: { $regex: filter.title, $options: "i" },
            }; // new RegExp(title, 'i')
        if (filter.description)
            query = {
                ...query,
                description: { $regex: filter.description, $options: "i" },
            };

        const page = Math.max(1, parseInt(`${filter.page || 1}`));
        const itemsPerPage = parseInt(
            `${filter.itemsPerPage || webConfig.itemsPerPage}`
        );
        const skipItems = (page - 1) * itemsPerPage;

        const totalItems = await TaskModel.find({ ...query }).countDocuments();
        let tasks = await TaskModel.find({ ...query })
            .sort({ createdAt: "desc" })
            .skip(skipItems)
            .limit(itemsPerPage);

        if (!tasks)
            throw new AppError(
                `Invalid data received, can't search Tasks`,
                HttpStatusCode.BAD_REQUEST
            );

        tasks = tasks.map((Task) => {
            // Task.
            return Task;
        });

        const successResponse = prepareSuccessResponse<TSearchTasksResults>({
            message: `search Tasks successfully!`,
            data: { tasks: tasks, total: totalItems },
        });
        res.status(HttpStatusCode.OK).json(successResponse);
    } catch (err) {
        next(err);
    }
};

export const updateTask = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const err = errors
                .array()
                .map((input: ValidationError) => input.msg);
            throw new AppError(err.toString(), HttpStatusCode.BAD_REQUEST);
        }

        const id = req.params.id;
        const { title, description, complete } = req.body;

        const updatedTask = await TaskModel.findByIdAndUpdate(
            id,
            { title, description, complete },
            {
                new: true,
            }
        );
        if (updatedTask == null)
            throw new AppError(
                "Invalid data received, can't update Task!",
                HttpStatusCode.BAD_REQUEST
            );

        const successResponse = prepareSuccessResponse<TTask>({
            message: `${updatedTask.title} updated successfully!`,
            data: updatedTask,
        });

        res.status(HttpStatusCode.OK).json(successResponse);
    } catch (err) {
        next(err);
    }
};

export const deleteTask = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const id = req.params.id;
        const deletedTask = await TaskModel.findByIdAndDelete(id);

        if (deletedTask === null)
            throw new AppError(
                "Invalid data received, can't delete Task!",
                HttpStatusCode.INTERNAL_SERVER_ERROR
            );

        const successResponse = prepareSuccessResponse<TTask>({
            message: `${deletedTask.title} Task deleted successfully!`,
            data: deletedTask,
        });

        res.status(HttpStatusCode.OK).json(successResponse);
    } catch (err) {
        next(err);
    }
};
