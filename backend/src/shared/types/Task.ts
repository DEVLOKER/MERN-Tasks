export type TTask = {
    id: string;
    title: string;
    description: string;
    complete: boolean;
};

type Pagination = {
    page: number;
    itemsPerPage: number;
};

export type TSearchTasksFilter = Partial<Omit<TTask, "id"> & Pagination>;

export type TSearchTasksResults = {
    tasks: TTask[];
    total?: number;
};

export type TCreateTaskForm = Omit<TTask, "id">;

export const TaskFilterActionType = {
    INIT: "INIT",
    SET: "SET",
    UNSET: "UNSET",
} as const;
