import * as React from "react";
import { modalContext } from "@/context/DeleteModalProvider";

export const useDeleteModal = () => {
    const context = React.useContext(modalContext);
    if (!context) {
        throw new Error(
            "useDeleteModal must be used within a modalContext provider"
        );
    }
    return context;
};
export default useDeleteModal;
