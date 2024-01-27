import Page404 from "@/pages/Page404";
import { taskRoutes } from "@/routes/taskRoutes";
import { createBrowserRouter } from "react-router-dom";

export const router = createBrowserRouter([
    ...taskRoutes,
    {
        path: "*",
        element: <Page404 />,
    },
]);
