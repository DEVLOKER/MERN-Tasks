import React from "react";
import {
    useMutation,
    useQueryClient,
    useInfiniteQuery,
    QueryClient,
    keepPreviousData,
} from "@tanstack/react-query";
import {
    createTask,
    readTasks,
    updateTask,
    deleteTask,
    readTask,
} from "@/services/api/TaskService";
import {
    TCreateTaskForm,
    TSearchTasksResults,
    TTask,
} from "@/shared/types/Task";
import { APIErrorResponse, APISuccessResponse } from "@/shared/types/RestAPI";
import { useTaskFilter } from "@/hooks/useTaskFilter";

type QueryProps = {
    queryClient?: QueryClient;
};

const taskQueryKey = ["Tasks"];

const useTasks = () => {
    const queryClient = useQueryClient();
    const { filter } = useTaskFilter();

    const query = useInfiniteQuery<
        APISuccessResponse<TSearchTasksResults>,
        APIErrorResponse
    >(
        {
            queryKey: taskQueryKey,
            initialPageParam: 1,
            placeholderData: keepPreviousData,
            queryFn: async ({ pageParam }) => {
                const searchFilter = {
                    ...filter,
                    page: parseInt(`${pageParam}`) ?? 1,
                    // page: pageParam,
                };
                return await readTasks(searchFilter);
            },
            getPreviousPageParam: (firstPage, pages) => {
                const previousPage =
                    firstPage.data.tasks?.length === filter.itemsPerPage
                        ? pages.length - 1
                        : undefined;
                return previousPage;
            },
            getNextPageParam: (lastPage, pages) => {
                const nextPage =
                    lastPage.data.tasks?.length === filter.itemsPerPage
                        ? pages.length + 1
                        : undefined;
                return nextPage;
            },
        },
        queryClient
    );

    const createTaskMutation = useCreateTask({ queryClient });

    const updateTaskMutation = useUpdateTask({ queryClient });

    const deleteTaskMutation = useDeleteTask({ queryClient });

    return {
        query,
        createTaskMutation,
        updateTaskMutation,
        deleteTaskMutation,
    };
};

export const useCreateTask = ({ queryClient }: QueryProps) => {
    const createTaskMutation = useMutation<
        APISuccessResponse<TTask>,
        APIErrorResponse,
        TCreateTaskForm
    >({
        mutationFn: createTask,
        onSuccess: (data) => {
            // if (queryClient) return queryClient.invalidateQueries(taskQueryKey);
        },
        onMutate: async () => {
            // if (queryClient) await queryClient.cancelQueries(taskQueryKey)
        },
        onSettled: () =>
            queryClient?.invalidateQueries({ queryKey: taskQueryKey }),
        // onError: (error) => {}
    });

    return createTaskMutation;
};

export const useReadTask = () => {
    const readUserMutation = useMutation<
        APISuccessResponse<TTask>,
        APIErrorResponse,
        Pick<TTask, "id">
    >({
        mutationFn: readTask,
        onSuccess: (data) => {},
        onMutate: async () => {
            // if (key && queryClient) await queryClient.cancelQueries(key)
        },
        // onError: (error) => {}
    });

    return readUserMutation;
};

export const useUpdateTask = ({ queryClient }: QueryProps) => {
    const updateTaskMutation = useMutation<
        APISuccessResponse<TTask>,
        APIErrorResponse,
        TTask
    >({
        mutationFn: updateTask,
        onSuccess: (data) => {
            // if ( queryClient) return queryClient.invalidateQueries(taskQueryKey);
        },
        onMutate: async () => {
            // if (queryClient) await queryClient.cancelQueries(taskQueryKey)
        },
        onSettled: () =>
            queryClient?.invalidateQueries({ queryKey: taskQueryKey }),
        // onError: (error) => {}
    });

    return updateTaskMutation;
};

export const useDeleteTask = ({ queryClient }: QueryProps) => {
    const deleteTaskMutation = useMutation<
        APISuccessResponse<TTask>,
        APIErrorResponse,
        Pick<TTask, "id">
    >({
        mutationFn: deleteTask,
        onSuccess: (data) => {
            // if (queryClient) return queryClient.invalidateQueries(taskQueryKey);
        },
        onMutate: async () => {
            // if (queryClient) await queryClient.cancelQueries(taskQueryKey)
        },
        onSettled: () =>
            queryClient?.invalidateQueries({ queryKey: taskQueryKey }),
        // onError: (error) => {}
    });

    return deleteTaskMutation;
};

export default useTasks;
