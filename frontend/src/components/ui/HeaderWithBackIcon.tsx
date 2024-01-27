import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { Typography } from "antd";

type Props = {
    title: string;
};
const HeaderWithBackIcon = ({ title }: Props) => {
    const navigate = useNavigate();
    const handleBack = () => navigate("/", { replace: true });

    return (
        <Typography.Title level={4}>
            <ArrowLeftOutlined onClick={handleBack} /> {title}
        </Typography.Title>
    );
};

export default HeaderWithBackIcon;
