import React from "react";
import { TTask } from "@/shared/types/Task";
import { List } from "antd";
import TaskItem from "./TaskItem";
import LoadingMore from "./LoadingMore";
import ConfirmDeleteDialog from "@/components/features/ConfirmDeleteDialog";
import DeleteModalProvider from "@/context/DeleteModalProvider";
type Props = {
    tasks: TTask[];
};
const TasksList = ({ tasks }: Props) => {
    return (
        <>
            <DeleteModalProvider>
                <List
                    //   loading={initLoading}
                    itemLayout="horizontal"
                    //   loadMore={loadMore}
                    dataSource={tasks}
                    renderItem={(task) => <TaskItem {...{ task }} />}
                />
                <LoadingMore />
                <ConfirmDeleteDialog />
            </DeleteModalProvider>
        </>
    );
};

export default TasksList;
