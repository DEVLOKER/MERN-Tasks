import React from "react";
import { Button } from "antd";
import useInfiniteTasks from "@/hooks/useInfiniteTasks";

const LoadingMore = () => {
    const { isFetchingNextPage, hasNextPage, nextPage } = useInfiniteTasks();

    const onLoadMore = () => {
        hasNextPage && nextPage(); // { pageParam: 50 }
    };
    return (
        <div
            style={{
                textAlign: "center",
                marginTop: 12,
                height: 32,
                lineHeight: "32px",
            }}
        >
            <Button
                onClick={onLoadMore}
                disabled={isFetchingNextPage || !hasNextPage}
            >
                {isFetchingNextPage
                    ? "Loading ..."
                    : hasNextPage
                    ? "load more"
                    : "Nothing to load"}
            </Button>
        </div>
    );
};

export default LoadingMore;
