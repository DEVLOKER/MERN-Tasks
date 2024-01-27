import * as React from "react";
import { taskFilterContext } from "@/context/TaskFilterProvider";

export const useTaskFilter = () => {
    const context = React.useContext(taskFilterContext);
    if (!context) {
        throw new Error(
            "useTaskFilter must be used within a modalContext provider"
        );
    }
    return context;
};
