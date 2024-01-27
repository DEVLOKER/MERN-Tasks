import * as React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "antd";
import HeaderWithBackIcon from "@/components/ui/HeaderWithBackIcon";
import { useReadTask } from "@/hooks/useTasks";
import { EditOutlined } from "@ant-design/icons";

const DetailTask = () => {
    const {
        data: successResponse,
        isPending,
        mutate: readTask,
    } = useReadTask();
    const params = useParams();

    const task = successResponse?.data;

    const navigate = useNavigate();
    const handleUpdate = () => {
        navigate(`/update/${params.id}`, {
            replace: true,
            state: task,
        });
    };

    React.useEffect(() => {
        params?.id && readTask({ id: params.id });
    }, []);

    return (
        <>
            <HeaderWithBackIcon title="Task detail" />
            <pre>{JSON.stringify(task, null, 4)}</pre>
            <div style={{ display: "flex", justifyContent: "end" }}>
                <Button onClick={handleUpdate} disabled={isPending || !task}>
                    <EditOutlined />
                    update
                </Button>
            </div>
        </>
    );
};

export default DetailTask;
