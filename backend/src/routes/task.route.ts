import express from "express";
import {
    createTask,
    readTask,
    readTasks,
    updateTask,
    deleteTask,
} from "#controllers/task.controller.js";
import { validateFormMiddleware } from "#middlewares/validateForm.middleware.js";

const TaskRouter = express.Router();

TaskRouter.post("/create", validateFormMiddleware, createTask);

TaskRouter.get(`/read/:id`, readTask);

TaskRouter.get("/read", readTasks);

TaskRouter.patch(`/update/:id`, validateFormMiddleware, updateTask);

TaskRouter.delete(`/delete/:id`, deleteTask);

export default TaskRouter;
