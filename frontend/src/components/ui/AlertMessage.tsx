import React from "react";
import { Alert } from "antd";
import { MutationStatus } from "@tanstack/react-query";

type TMessage = {
    status: MutationStatus;
    successMessage: string;
    errorMessage: string;
};

const AlertMessage = ({ status, successMessage, errorMessage }: TMessage) => {
    if (status === "idle") return <></>;

    // 'success' | 'info' | 'warning' | 'error'
    let type = "info",
        message = "";

    switch (status) {
        case "pending":
            type = "info";
            message = "pending....";
            break;
        case "success":
            type = "success";
            message = successMessage;
            break;
        case "error":
            type = "error";
            message = errorMessage;
            break;
    }

    return (
        <div style={{ padding: "20px 0px" }}>
            <Alert message={message} type={type} showIcon closable />
        </div>
    );
};

export default AlertMessage;
