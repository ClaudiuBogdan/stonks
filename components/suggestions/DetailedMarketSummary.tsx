import Link from "next/link";
import {useRef, useState} from "react";
import MarketSparkline from "./MarketSparkline";
import {MarketSuggestion} from "../../pages/api/suggestions/markets";
import styles from './DetailedMarket.module.scss'
// @ts-ignore
import ColorThief from "colorthief";

interface TopMarketSuggestionProps {
    market: MarketSuggestion
}

export default function DetailedMarketSummary({market}: TopMarketSuggestionProps) {

    const [colorArrays, setColorArrays] = useState([]);
    const imgRef = useRef<HTMLImageElement>(null);

    function getColorArrays() {
        const colorThief = new ColorThief();
        setColorArrays(colorThief.getColor(imgRef.current));
    }

    function colorArrayToRGB(values?: number[]) {
        return values && "rgb(" + values.join(', ') + ")";
    }

    const {currStockValue, stockDayVariation, stockDayPercentage, stockColor} = getStockStats(market.sparklines)

    return (<div>
        <Link href={`/markets/${encodeURIComponent(market.symbol)}`}>

            <div className={styles['logo-container']}>
                <div style={{background: colorArrayToRGB(colorArrays)}}>
                    <img
                        src={market.imagePath}
                        alt={"market logo " + market.name}
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
                                {market.name}
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

function getStockStats(stockValues: number[]) {
    const currStockValue = stockValues[stockValues.length - 1]
    const prevStockValue = stockValues[stockValues.length - 2]
    const stockDayVariation = currStockValue - prevStockValue;
    const stockDayPercentage = 100 * stockDayVariation / prevStockValue

    const stockColor = stockDayVariation > 0 ? 'green' : 'red'

    return {currStockValue, stockDayVariation, stockDayPercentage, stockColor}
}