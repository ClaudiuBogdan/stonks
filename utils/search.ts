import useDebounce from "./debounce";
import useSWR from "swr";
import fetcher from "./fetcher";
import {SearchData} from "../pages/api/search";

const useSearch = (query: string) => {

    // Debounce search request to avoid overloading the api
    const debouncedQuery = useDebounce(query, 300)

    // TODO add conditional request if searchTerm is empty string
    const {data, error} = useSWR<SearchData>(`/api/search?q=${debouncedQuery}`, fetcher)

    const results = data && data.data

    return {
        results,
        isLoading: !error && !data,
        isError: error
    }
}
export default useSearch