import * as React from "react";
import { TTask } from "@/shared/types/Task";
import { List } from "antd";
import TaskItem from "./TaskItem";
import LoadingMore from "./LoadingMore";
import ConfirmDeleteDialog from "@/components/features/ConfirmDeleteDialog";
import DeleteModalProvider from "@/context/DeleteModalProvider";
import { randomKey } from "@/utils/helpers";
type Props = {
    tasks: TTask[];
};
const TasksList = ({ tasks }: Props) => {
    return (
        <>
            <DeleteModalProvider>
                <List
                    itemLayout="horizontal"
                    dataSource={tasks}
                    renderItem={(task) => (
                        <TaskItem key={randomKey()} {...{ task }} />
                    )}
                />
                <LoadingMore />
                <ConfirmDeleteDialog />
            </DeleteModalProvider>
        </>
    );
};

export default TasksList;
