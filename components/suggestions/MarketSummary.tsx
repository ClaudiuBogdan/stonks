import Link from "next/link";
import MarketSparkline from "./MarketSparkline";
import {MarketSuggestion} from "../../pages/api/suggestions/markets";

interface TopMarketSuggestionProps {
    market: MarketSuggestion
}

export default function MarketSummary({market}: TopMarketSuggestionProps) {
    return (<div>
        <Link href={`/markets/${encodeURIComponent(market.symbol)}`}>
            <div style={{cursor: "pointer"}}>
                <p>{market.name}</p>
                <MarketSparkline sparklines={market.sparklines}/>
            </div>
        </Link>
    </div>)
}
