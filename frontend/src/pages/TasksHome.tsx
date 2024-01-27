import React from "react";
import TasksList from "@/components/ui/TasksList";
import ButttonAddTask from "@/components/ui/ButtonAddTask";
import useScrollEnd from "@/hooks/useScrollEnd";
import { Alert } from "antd";
import useInfiniteTasks from "@/hooks/useInfiniteTasks";
import { TaskFilterProvider } from "@/context/TaskFilterProvider";

const TasksHome = () => {
    const { status, tasks, error, hasNextPage, nextPage } = useInfiniteTasks();

    const handleNextPage = () => hasNextPage && nextPage();

    const { reachedEnd } = useScrollEnd();
    if (reachedEnd) handleNextPage();

    if (status === "pending")
        return (
            <div>
                <Alert message="Fetching ..." type="info" />
            </div>
        );

    if (status === "error")
        return (
            <div>
                <Alert message={`${error}`} type="error" />
            </div>
        );

    return (
        <>
            <TaskFilterProvider>
                <TasksList {...{ tasks }} />
            </TaskFilterProvider>
            <ButttonAddTask />
        </>
    );
};
export default TasksHome;
