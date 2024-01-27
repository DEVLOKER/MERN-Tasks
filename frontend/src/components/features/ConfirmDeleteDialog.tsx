import React from "react";
import { Modal } from "antd";
import useDeleteModal from "@/hooks/useDeleteModal";
import useTasks from "@/hooks/useTasks";

const ConfirmDeleteDialog = () => {
    const {
        state: { isModalOpen, task },
        closeModal,
    } = useDeleteModal();

    const {
        deleteTaskMutation: { mutate: deleteTask },
    } = useTasks();

    const handleOk = () => {
        task && deleteTask({ id: task?.id });
        closeModal();
    };

    const handleCancel = () => closeModal();

    if (!isModalOpen) return <></>;

    return (
        <Modal
            title="Delete task"
            open={isModalOpen}
            onOk={handleOk}
            okButtonProps={{
                danger: true,
            }}
            onCancel={handleCancel}
        >
            <pre>{JSON.stringify(task, null, 4)}</pre>
        </Modal>
    );
};

export default ConfirmDeleteDialog;
