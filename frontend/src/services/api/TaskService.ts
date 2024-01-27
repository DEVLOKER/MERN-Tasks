import httpCommon from "@/services/api/httpCommon";
import {
    TTask,
    TSearchTasksResults,
    TCreateTaskForm,
    TSearchTasksFilter,
} from "@/shared/types/Task";
import { APISuccessResponse } from "@/shared/types/RestAPI";
import { apiTaskURL } from "@/constants/api";
import { prepareSearchQuery } from "@/utils/helpers";

export const createTask = async (
    newTask: TCreateTaskForm
): Promise<APISuccessResponse<TTask>> => {
    const { data: successResponse } = await httpCommon.post<
        APISuccessResponse<TTask>
    >(`${apiTaskURL}/create`, newTask);
    return successResponse;
};

export const readTask = async ({
    id,
}: Pick<TTask, "id">): Promise<APISuccessResponse<TTask>> => {
    const { data: successResponse } = await httpCommon.get<
        APISuccessResponse<TTask>
    >(`${apiTaskURL}/read/${id}`);
    return successResponse;
};

export const readTasks = async (
    filter: TSearchTasksFilter
): Promise<APISuccessResponse<TSearchTasksResults>> => {
    const searchQuery: string = prepareSearchQuery(filter);
    const { data: successResponse } = await httpCommon.get<
        APISuccessResponse<TSearchTasksResults>
    >(`${apiTaskURL}/read${searchQuery}`);
    return successResponse;
};

export const updateTask = async (
    updatedTask: TTask
): Promise<APISuccessResponse<TTask>> => {
    const { data: successResponse } = await httpCommon.patch<
        APISuccessResponse<TTask>
    >(`${apiTaskURL}/update/${updatedTask.id}`, updatedTask);
    return successResponse;
};

export const deleteTask = async ({
    id,
}: Pick<TTask, "id">): Promise<APISuccessResponse<TTask>> => {
    const { data: successResponse } = await httpCommon.delete<
        APISuccessResponse<TTask>
    >(`${apiTaskURL}/delete/${id}`);
    return successResponse;
};

export default { createTask, readTask, readTasks, updateTask, deleteTask };
