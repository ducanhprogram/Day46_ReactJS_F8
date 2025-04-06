import { useEffect, useState } from "react";

function useDebounce(value, delay) {
    const [debounce, setDebounce] = useState(value);
    useEffect(() => {
        if (!value) {
            return;
        }
        const timer = setTimeout(() => {
            setDebounce(value);
        }, delay);

        return () => {
            clearTimeout(timer);
        };
    }, [value, delay]);

    return debounce;
}

export default useDebounce;
