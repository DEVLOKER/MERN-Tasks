import * as React from "react";
import { TTask } from "@/shared/types/Task";

export const ModalStates = {
    OPEN: "OPEN",
    CLOSE: "CLOSE",
} as const;

export type TModalStates = typeof ModalStates;

export type TState = {
    task: TTask | undefined;
    isModalOpen: boolean;
};

export type TAction =
    | {
          type: TModalStates[keyof Pick<TModalStates, "OPEN">];
          payload: TTask;
      }
    | {
          type: TModalStates[keyof Pick<TModalStates, "CLOSE">];
      };

export type TContext = {
    state: TState;
    openModal: (task: TTask) => void;
    closeModal: () => void;
};

export const initialState: TState = { isModalOpen: false, task: undefined };

export const modalContext = React.createContext<TContext | undefined>(
    undefined
);

const modalReducer = (state: TState, action: TAction): TState => {
    const { type } = action;
    switch (type) {
        case ModalStates.OPEN:
            return { isModalOpen: true, task: action.payload };
        case ModalStates.CLOSE:
            return { isModalOpen: false, task: undefined };
        default:
            return initialState;
    }
};

type Props = {
    children: React.ReactNode;
};
const DeleteModalProvider = ({ children }: Props) => {
    const [state, dispatch] = React.useReducer(modalReducer, initialState);

    const openModal = (task: TTask) => {
        dispatch({ type: "OPEN", payload: task });
    };

    const closeModal = () => {
        dispatch({ type: "CLOSE" });
    };

    return (
        <modalContext.Provider value={{ state, openModal, closeModal }}>
            {children}
        </modalContext.Provider>
    );
};

export default DeleteModalProvider;
