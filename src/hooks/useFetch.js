import { useEffect, useState } from "react";

const useFetch = (url) => {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState({});

    useEffect(() => {
        setIsLoading(true);

        const fetchAPI = async () => {
            try {
                const response = await fetch(url);
                const res = await response.json();
                setData(res);
            } catch (e) {
                setError(e.error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchAPI();
    }, [url]);
    return [data, isLoading, error];
};

export default useFetch;
