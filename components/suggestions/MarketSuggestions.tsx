import Link from "next/link";
import useSWR from "swr";
import fetcher from "../../utils/fetcher";
import {MarketSuggestionData} from "../../pages/api/suggestions/markets";
import MarketSparkline from "./MarketSparkline";
import styles from './Suggestions.module.scss'

export default function MarketSuggestions() {

    const {data: results, error} = useSWR<MarketSuggestionData>(`/api/suggestions/markets/`, fetcher)
    const sections = results ? results.data.sections : []
    return (<div>
        <div>
            {sections.map(section => (
                <>
                    <h2>{section.name}</h2>
                    <div
                        key={section.name}
                        className={styles['container']}>
                        {section.markets.map(e => (
                            <div
                                key={e.symbol}
                                className={styles['market-container']}>
                                <Link href={`/markets/${encodeURIComponent(e.symbol)}`}>
                                    <div style={{cursor: "pointer"}}>
                                        {e.name}
                                        <MarketSparkline sparklines={e.sparklines}/>
                                    </div>
                                </Link>
                            </div>
                        ))}
                    </div>
                </>
            ))}
        </div>

    </div>)
}
