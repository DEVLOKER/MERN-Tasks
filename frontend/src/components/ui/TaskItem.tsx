import React from "react";
import { Button, List, Badge } from "antd";
import { TTask } from "@/shared/types/Task";
import { useNavigate } from "react-router-dom";
import useDeleteModal from "@/hooks/useDeleteModal";

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

    const { openModal } = useDeleteModal();
    const handleDelete = () => openModal(task);

    return (
        <Badge.Ribbon
            text={task.complete ? "complete" : "not complete"}
            placement="start"
            style={{ top: -5, left: -10 }}
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
