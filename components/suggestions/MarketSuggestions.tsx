import Link from "next/link";
import {SearchResult} from "../../pages/api/search";
import useSWR from "swr";
import fetcher from "../../utils/fetcher";
import {MarketSuggestionData} from "../../pages/api/suggestions/markets";

export default function MarketSuggestions() {

    const {data: results, error} = useSWR<MarketSuggestionData>(`/api/suggestions/markets/`, fetcher)
    const suggestions = results ? results.data : []
    return (<div>
        <h2>Market suggestions</h2>
        <ul>
            {suggestions.map(e => (
                <li key={e.symbol}>
                    <Link href={`/markets/${encodeURIComponent(e.symbol)}`}>
                        <a>{e.name}</a>
                    </Link>
                </li>
            ))}
        </ul>
    </div>)
}
