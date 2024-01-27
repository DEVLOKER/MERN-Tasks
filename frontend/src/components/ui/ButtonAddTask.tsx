import React from "react";
import { FloatButton } from "antd";

import { PlusOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const ButtonAddTask = () => {
    const navigate = useNavigate();

    const handleAddTask = () => {
        navigate("create", { replace: true });
    };

    return (
        <FloatButton
            icon={<PlusOutlined />}
            type="primary"
            style={{ right: 24 }}
            onClick={handleAddTask}
        />
    );
};

export default ButtonAddTask;
