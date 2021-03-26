import Link from "next/link";
import useSWR from "swr";
import fetcher from "../../utils/fetcher";
import {MarketSuggestionData} from "../../pages/api/suggestions/markets";
import MarketSparkline from "./MarketSparkline";
import styles from './Suggestions.module.scss'

export default function MarketSuggestions() {

    const {data: results, error} = useSWR<MarketSuggestionData>(`/api/suggestions/markets/`, fetcher)
    const suggestions = results ? results.data : []
    return (<div style={{margin: '10% 0'}}>
        <h2>Market suggestions</h2>
        <div className={styles['container']}>
            {suggestions.map(e => (
                <div
                    key={e.symbol}
                    className={styles['market-container']}>
                    <Link href={`/markets/${encodeURIComponent(e.symbol)}`}>
                        <div style={{cursor: "pointer"}}>
                            {e.name}
                            <MarketSparkline/>
                        </div>
                    </Link>
                </div>
            ))}
        </div>
    </div>)
}
