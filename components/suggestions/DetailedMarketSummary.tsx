import Link from "next/link";
import {useRef, useState} from "react";
import MarketSparkline from "./MarketSparkline";
import {MarketSuggestion} from "../../pages/api/suggestions/markets";
import styles from './styles/DetailedMarket.module.scss'
// @ts-ignore
import ColorThief from "colorthief";
import {getStockSummary} from "../../utils/stocks";

interface TopMarketSuggestionProps {
    market: MarketSuggestion
}

const imagePlaceholder = '/assets/companies/150x150/placeholder.png'

export default function DetailedMarketSummary({market}: TopMarketSuggestionProps) {
    const [colorArrays, setColorArrays] = useState([238, 238, 238]);
    const imgRef = useRef<HTMLImageElement>(null);

    function getColorArrays() {
        const colorThief = new ColorThief();
        setColorArrays(colorThief.getColor(imgRef.current));
    }

    function colorArrayToRGB(values?: number[]) {
        return values && "rgb(" + values.join(', ') + ")";
    }

    const {currStockValue, stockDayVariation, stockDayPercentage, stockColor} = getStockSummary(market.sparklines)
    // If market not have time series data, return error
    if (!currStockValue) {
        return (
            <div>Error</div>
        )
    }

    return (<div>
        <Link href={`/markets/${encodeURIComponent(market.symbol)}`}>

            <div className={styles['logo-container']}>
                <div style={{background: colorArrayToRGB(colorArrays)}}>
                    <img
                        className={styles['logo']}
                        src={market.imagePath || imagePlaceholder}
                        alt={"market logo " + market.summary.name}
                        ref={imgRef}
                        onLoad={() => getColorArrays()}/>
                </div>

                <div className={styles['bottom-container']}>
                    <div className={styles['info-container']}>

                        <div className={styles['title-container']}>
                            <span className={styles['market-symbol']}>
                                {market.symbol}
                            </span>
                            <span className={styles['separator']}>|</span>
                            <span className={styles['market-name']}>
                                {market.summary.name}
                            </span>
                        </div>

                        <div className={styles['stats-container']}>
                            <span className={styles['stock-value']}>
                                {currStockValue.toFixed(2)}
                            </span>
                            <span className={styles['stock-variation']}
                                  style={{color: stockColor}}>
                                {stockDayVariation.toFixed(2)}
                            </span>
                            <span className={styles['stock-percentage']}
                                  style={{color: stockColor}}>
                                ({stockDayPercentage.toFixed(2)}%)
                            </span>
                        </div>
                    </div>

                    <div className={styles['sparkline-container']}>
                        <MarketSparkline sparklines={market.sparklines}/>
                    </div>
                </div>
            </div>
        </Link>
    </div>)
}