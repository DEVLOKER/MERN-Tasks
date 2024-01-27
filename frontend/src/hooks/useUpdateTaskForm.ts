import * as React from "react";
import { Form } from "antd";

import useTasks from "@/hooks/useTasks";
import { TTask } from "@/shared/types/Task";
import { useNavigate } from "react-router-dom";

const useUpdateTaskForm = () => {
    const [form] = Form.useForm<TTask>();
    const task = Form.useWatch([], form);
    const [submittable, setSubmittable] = React.useState(false);

    const navigate = useNavigate();
    React.useEffect(() => {
        form.validateFields({ validateOnly: true }).then(
            () => setSubmittable(true),
            () => setSubmittable(false)
        );
    }, [task]);

    const {
        updateTaskMutation: {
            data: successResponse,
            error,
            status,
            mutate: updateTask,
        },
    } = useTasks();

    React.useEffect(() => {
        if (status === "success") {
            setTimeout(() => {
                navigate("/", { replace: true });
            }, 10);
        }
    }, [status]);

    return {
        form,
        task,
        submittable,
        successResponse,
        error,
        status,
        updateTask,
    };
};

export default useUpdateTaskForm;
