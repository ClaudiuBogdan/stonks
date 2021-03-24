import useDebounce from "./debounce";
import {useCallback} from "react";
import useSWR from "swr";

const useSearch = (query: string) => {

    // Debounce search request to avoid overloading the api
    const debouncedQuery = useDebounce(query, 300)

    // Fetcher for the api search query
    const fetchSearch = useCallback(
        () => fetch(`/api/search?q=${debouncedQuery}`).then(response => response.json()),
        [debouncedQuery]
    )
    const {data, error} = useSWR(['/api/search', debouncedQuery], fetchSearch)

    return {
        results: data,
        isLoading: !error && !data,
        isError: error
    }
}
export default useSearch