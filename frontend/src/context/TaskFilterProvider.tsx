import * as React from "react";
import { TaskFilterActionType } from "@/shared/types/Task";
import { TSearchTasksFilter as TaskFilter } from "@/shared/types/Task";

export type TaskFilterStateType = {
    filter: TaskFilter;
    // dispatch: (action: TaskFilterAction)=> void
    dispatch: React.Dispatch<TaskFilterAction>;
};

const initialTaskFilterState: TaskFilterStateType = {
    filter: {
        page: 1,
        itemsPerPage: 5,
    },
    dispatch: () => null,
};

export const taskFilterContext = React.createContext<TaskFilterStateType>(
    initialTaskFilterState
);

export type TaskFilterAction = {
    type: (typeof TaskFilterActionType)[keyof typeof TaskFilterActionType];
    payload: Partial<TaskFilter>;
};

const taskFilterReducer = (
    state: TaskFilter,
    action: TaskFilterAction
): TaskFilter => {
    const { type, payload } = action;
    switch (type) {
        case TaskFilterActionType.INIT:
            return initialTaskFilterState.filter;
        case TaskFilterActionType.SET:
            return { ...state, ...payload };
        case TaskFilterActionType.UNSET:
            // Object.keys(payload).map(key=>{ delete state[key as keyof TaskFilter] })
            Object.keys(payload).map((key) => {
                state[key as keyof TaskFilter] = undefined;
            });
            return state;
        default:
            return initialTaskFilterState.filter;
    }
};

type Props = {
    children: React.ReactNode;
};
export const TaskFilterProvider = ({ children }: Props) => {
    // React.ReactNode // ReactElement | null

    const [filter, dispatch] = React.useReducer(
        taskFilterReducer,
        initialTaskFilterState.filter
    );

    return (
        <>
            <taskFilterContext.Provider
                value={{ filter: filter, dispatch: dispatch }}
            >
                {children}
            </taskFilterContext.Provider>
        </>
    );
};
