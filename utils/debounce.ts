import {useEffect, useState} from "react";

const useDebounce = <Data = any> (value: Data, delay: number) => {
    const [debouncedValue, setDebouncedValue] = useState<Data>(value);
    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);
        return () => {
            clearTimeout(handler);
        };
    }, [value, delay]);
    return debouncedValue;
};
export default useDebounce;