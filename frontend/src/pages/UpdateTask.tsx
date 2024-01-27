import * as React from "react";
import { Button, Form, Input, Switch } from "antd";
import { useLocation } from "react-router-dom";
import { TTask } from "@/shared/types/Task";
import HeaderWithBackIcon from "@/components/ui/HeaderWithBackIcon";
import AlertMessage from "@/components/ui/AlertMessage";
import useUpdateTaskForm from "@/hooks/useUpdateTaskForm";

const UpdateTask = () => {
    const {
        form,
        task,
        submittable,
        successResponse,
        error,
        status,
        updateTask,
    } = useUpdateTaskForm();

    const handleSubmit = () => updateTask(task);

    const { state: initialTask } = useLocation();
    React.useEffect(() => {
        form.setFieldsValue(initialTask);
    }, []);

    return (
        <>
            <HeaderWithBackIcon title="Update a task" />

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
                <Form.Item<TTask> label="id" name="id">
                    <Input disabled={true} />
                </Form.Item>
                <Form.Item<TTask>
                    label="title"
                    name="title"
                    rules={[
                        { required: true, message: "Please input task title!" },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item<TTask>
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
                <Form.Item<TTask> label="complete" name="complete">
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

export default UpdateTask;
