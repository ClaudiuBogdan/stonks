import Link from "next/link";
import MarketSparkline from "./MarketSparkline";
import {MarketSuggestion} from "../../pages/api/suggestions/markets";
import styles from "./styles/MarketSummary.module.scss";
import {getStockSummary} from "../../utils/stocks";

interface TopMarketSuggestionProps {
    market: MarketSuggestion
}

const imagePlaceholder = '/assets/companies/150x150/placeholder.png'

export default function MarketSummary({market}: TopMarketSuggestionProps) {

    const {currStockValue, stockDayVariation, stockDayPercentage, stockColor} = getStockSummary(market.sparklines)

    const {summary: marketSummary} = market

    return (<div>
        <Link href={`/markets/${encodeURIComponent(marketSummary.symbol)}`}>
            <div className={styles['container']}>
                <div className={styles['top-section']}>
                    <img
                        className={styles['logo']}
                        src={market.imagePath ?? imagePlaceholder}
                        alt={"market logo " + marketSummary.name}/>
                    <div className={styles['details-container']}>
                        <span className={styles['symbol']}>
                            {marketSummary.symbol}
                        </span>
                        <span className={styles['name']}>
                            {marketSummary.name}
                        </span>
                    </div>
                </div>
                <div className={styles['stock-change-container']}>
                    <span>Change (1W)</span>
                    <span style={{color: stockColor}}>
                        {stockDayPercentage > 0 ? '▲' : '▼'} {stockDayPercentage.toFixed(2)}%
                    </span>
                </div>
                <div className={styles['sparkline-container']}>
                    <MarketSparkline sparklines={market.sparklines}/>
                </div>
                <div className={styles['stock-value']}>
                    <span>
                        {currStockValue.toFixed(2)} {marketSummary.currency}
                    </span>
                </div>
            </div>
        </Link>
    </div>)
}
