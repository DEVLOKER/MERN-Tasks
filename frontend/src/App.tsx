import React from "react";
import { RouterProvider } from "react-router-dom";
import PageLayoutWrapper from "./components/features/PageLayoutWrapper";
import { router } from "@/routes";
import ReactQueryProvider from "@/context/ReactQueryProvider";

function App() {
    return (
        <PageLayoutWrapper>
            <ReactQueryProvider>
                <RouterProvider router={router} />
            </ReactQueryProvider>
        </PageLayoutWrapper>
    );
}

export default App;
