import useDebounce from "./debounce";
import useSWR from "swr";
import fetcher from "./fetcher";

const useSearch = <Data = any>(query: string) => {

    // Debounce search request to avoid overloading the api
    const debouncedQuery = useDebounce(query, 300)

    const {data, error} = useSWR<Data>(`/api/search?q=${debouncedQuery}`, fetcher)
    return {
        results: data,
        isLoading: !error && !data,
        isError: error
    }
}
export default useSearch