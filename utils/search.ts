import useDebounce from "./debounce";
import useSWR from "swr";
import fetcher from "./fetcher";
import {SearchData} from "../pages/api/search";

const useSearch = (query: string) => {

    // Debounce search request to avoid overloading the api
    const debouncedQuery = useDebounce<string>(query, 300)

    // Conditional request if searchTerm is empty string
    const searchApi = debouncedQuery ? `/api/search?q=${debouncedQuery}` : null

    const {data, error} = useSWR<SearchData>(searchApi, fetcher, {suspense: false})

    const results = data && data.data

    return {
        results,
        isLoading: !error && !data,
        isError: error
    }
}
export default useSearch