import React, { ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

export const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
            refetchOnMount: false,
            refetchOnReconnect: false,
            retry: false, // ✅ turns retries off
            staleTime: 5 * 60 * 1000,
        },
    },
    logger: {
        log: console.log,
        warn: console.warn,
        // ✅ no more errors on the console for tests
        error: process.env.NODE_ENV === "test" ? () => {} : console.error,
    },
});

type Props = {
    children: ReactNode;
};

const ReactQueryProvider = ({ children }: Props) => {
    return (
        <QueryClientProvider client={queryClient}>
            {children}
            {/* {process.env.NODE_ENV === "development" && (
                <ReactQueryDevtools initialIsOpen={false} />
            )} */}
        </QueryClientProvider>
    );
};

export default ReactQueryProvider;
