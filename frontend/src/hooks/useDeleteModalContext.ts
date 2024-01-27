import * as React from "react";
import { modalContext } from "@/context/DeleteModalProvider";

export const useDeleteModalContext = () => {
    const context = React.useContext(modalContext);
    if (!context) {
        throw new Error(
            "useDeleteModalContext must be used within a modalContext provider"
        );
    }
    return context;
};
export default useDeleteModalContext;
