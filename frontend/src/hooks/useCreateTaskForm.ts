import * as React from "react";
import { Form } from "antd";
import { TCreateTaskForm } from "@/shared/types/Task";
import useTasks from "@/hooks/useTasks";

const useCreateTaskForm = () => {
    const [form] = Form.useForm<TCreateTaskForm>();
    const task = Form.useWatch([], form);
    const [submittable, setSubmittable] = React.useState(false);

    React.useEffect(() => {
        form.validateFields({ validateOnly: true }).then(
            () => setSubmittable(true),
            () => setSubmittable(false)
        );
    }, [task]);

    const {
        createTaskMutation: {
            data: successResponse,
            error,
            status,
            mutate: createTask,
        },
    } = useTasks();

    return {
        form,
        task,
        submittable,
        successResponse,
        error,
        status,
        createTask,
    };
};

export default useCreateTaskForm;
