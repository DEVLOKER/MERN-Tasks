import React from "react";
import { Button, Form, Input, Switch } from "antd";
import { TCreateTaskForm } from "@/shared/types/Task";
import useCreateTaskForm from "@/hooks/useCreateTaskForm";
import AlertMessage from "@/components/ui/AlertMessage";
import HeaderWithBackIcon from "@/components/ui/HeaderWithBackIcon";

const CreateTask = () => {
    const {
        form,
        task,
        submittable,
        successResponse,
        error,
        status,
        createTask,
    } = useCreateTaskForm();

    const handleSubmit = () => {
        createTask(task);
        form.setFieldsValue({
            title: "",
            description: "",
            complete: false,
        });
    };

    return (
        <>
            <HeaderWithBackIcon title="Create a new task" />

            <AlertMessage
                status={status}
                successMessage={`${successResponse?.message}`}
                errorMessage={`${error?.message}`}
            />

            <Form
                name="basic"
                form={form}
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                style={{ maxWidth: 600 }}
                initialValues={{ remember: true }}
                autoComplete="off"
            >
                <Form.Item<TCreateTaskForm>
                    label="title"
                    name="title"
                    rules={[
                        { required: true, message: "Please input task title!" },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item<TCreateTaskForm>
                    label="description"
                    name="description"
                    rules={[
                        {
                            required: true,
                            message: "Please input task description!",
                        },
                    ]}
                >
                    <Input.TextArea rows={4} />
                </Form.Item>
                <Form.Item<TCreateTaskForm> label="complete" name="complete">
                    <Switch checked={task?.complete} />
                </Form.Item>
                <Form.Item label=" " style={{ textAlign: "right" }}>
                    <Button
                        onClick={handleSubmit}
                        disabled={!submittable || status === "pending"}
                        type="primary"
                    >
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </>
    );
};

export default CreateTask;
