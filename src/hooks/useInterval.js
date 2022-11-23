import {useEffect, useRef} from "react";

export function useInterval(callback, delay) {
    const savedCallback = useRef();
    // 마지막 콜백을 기억
    useEffect(() => {
        savedCallback.current = callback;
    }, [callback]);

    //Interval 설정

    useEffect(() => {
        function tick() {
            savedCallback.current();
        }
        if(delay !== null) {
            const id = setInterval(tick, delay);
            return () => {
                clearInterval(id);
            };
        }
    }, [delay]);
}