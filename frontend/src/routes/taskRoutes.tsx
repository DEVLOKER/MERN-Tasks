import CreateTask from "@/pages/CreateTask";
import DetailTask from "@/pages/DetailTask";
import TasksHome from "@/pages/TasksHome";
import UpdateTask from "@/pages/UpdateTask";

export const taskRoutes = [
    {
        path: "/",
        element: <TasksHome />,
    },
    {
        path: "/create",
        element: <CreateTask />,
    },
    {
        path: "/update/:id",
        element: <UpdateTask />,
    },
    {
        path: "/detail/:id",
        element: <DetailTask />,
    },
];
