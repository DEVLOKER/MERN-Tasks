import React from "react";
import { Button, List, Badge } from "antd";
import { TTask } from "@/shared/types/Task";
import { useNavigate } from "react-router-dom";
import useDeleteModalContext from "@/hooks/useDeleteModalContext";

type Props = {
    task: TTask;
};

const TaskItem = ({ task }: Props) => {
    const navigate = useNavigate();

    const handleUpdate = () => {
        navigate(`/update/${task.id}`, {
            replace: true,
            state: task,
        });
    };
    const handleDetail = () => {
        navigate(`/detail/${task.id}`, { replace: true });
    };

    const { openModal } = useDeleteModalContext();
    const handleDelete = () => openModal(task);

    return (
        <Badge.Ribbon
            text={task.complete ? "complete" : "not complete"}
            placement="end"
            style={{ top: 0 }}
            color={task.complete ? "green" : "red"}
        >
            <List.Item
                key={task.id}
                actions={[
                    <Button type="link" onClick={handleUpdate}>
                        update
                    </Button>,
                    <Button type="link" danger onClick={handleDelete}>
                        delete
                    </Button>,
                ]}
            >
                <List.Item.Meta
                    title={
                        <a href="#" onClick={handleDetail}>
                            {task.title}
                        </a>
                    }
                    description={
                        <div
                            style={{
                                display: "-webkit-box",
                                WebkitBoxOrient: "vertical",
                                WebkitLineClamp: 2,
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                            }}
                        >
                            {task.description}
                        </div>
                    }
                />
            </List.Item>
        </Badge.Ribbon>
    );
};

export default TaskItem;
