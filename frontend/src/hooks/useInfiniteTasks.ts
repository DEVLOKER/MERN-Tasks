import React from "react";
import useScrollEnd from "@/hooks/useScrollEnd";
import useTasks from "@/hooks/useTasks";

const useInfiniteTasks = () => {
    const {
        query: {
            status,
            isFetching,
            data: successResponse,
            error,
            isFetchingNextPage,
            hasNextPage,
            fetchNextPage,
        },
    } = useTasks();

    const tasks = Array.prototype.concat.apply(
        [],
        successResponse?.pages.map((page) => page.data.tasks) ?? []
    );

    const nextPage = () => hasNextPage && fetchNextPage(); // { pageParam: 50 }

    const { reachedEnd } = useScrollEnd();
    if (reachedEnd) nextPage();

    return {
        status,
        isFetching,
        tasks,
        error,
        hasNextPage,
        isFetchingNextPage,
        nextPage,
    };
};

export default useInfiniteTasks;
