import React from "react";

type TElement = React.RefObject<HTMLElement>;

const useScrollEnd = (element?: TElement) => {
    const [reachedEnd, setReachedEnd] = React.useState<boolean>(false);

    React.useEffect(() => {
        const handleScroll = () => {
            const { scrollHeight, scrollTop, clientHeight } =
                element?.current || document.documentElement || window;
            const isReached = scrollHeight - scrollTop - clientHeight <= 10;

            setReachedEnd(isReached);
        };

        window.addEventListener("scroll", handleScroll);

        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return { reachedEnd };
};

export default useScrollEnd;
