import React, { ReactElement, ReactNode } from "react";
import { Layout, Typography } from "antd";
import { BarsOutlined } from "@ant-design/icons";

type Props = {
    children: ReactNode; // ReactNode | ReactElement
};

const PageLayoutWrapper = ({ children }: Props) => {
    return (
        <Layout style={{ width: "100%" }}>
            <Layout.Header
                style={{
                    position: "sticky",
                    top: 0,
                    zIndex: 1,
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background: "#334454",
                    boxShadow: "0px 5px 8px 1px #bbbbbb",
                    paddingBottom: "16px",
                }}
            >
                <a href="/">
                    <Typography.Title level={2} style={{ color: "#ffffff" }}>
                        <BarsOutlined style={{ marginRight: 15 }} />
                        Task Manager
                    </Typography.Title>
                </a>
            </Layout.Header>
            <Layout.Content style={{ padding: "0 48px" }}>
                <div
                    style={{
                        background: "#FFFFFF",
                        minHeight: 280,
                        marginTop: 50,
                        padding: 24,
                        borderRadius: 20,
                    }}
                >
                    {children}
                </div>
            </Layout.Content>
            <Layout.Footer style={{ textAlign: "center" }}>
                ©{new Date().getFullYear()} Created by{" "}
                <a href="https://www.dev-loker.com">Devloker</a>
            </Layout.Footer>
        </Layout>
    );
};

export default PageLayoutWrapper;
