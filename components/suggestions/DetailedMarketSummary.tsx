import Link from "next/link";
import Image from 'next/image'
import {useState} from "react";
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

    function getColorArrays(imgRef: any) {
        const colorThief = new ColorThief();
        try {
            setColorArrays(colorThief.getColor(imgRef));
        } catch (e) {
            //Image not loaded
        }
    }

    function colorArrayToRGB(values?: number[]) {
        return values && "rgb(" + values.join(', ') + ")";
    }

    const {currStockValue, stockDayVariation, stockDayPercentage, stockColor} = getStockSummary(market.sparklines)

    return (<div>
        <Link href={`/markets/${encodeURIComponent(market.symbol)}`}>

            <div className={styles['logo-container']}>
                <div style={{background: colorArrayToRGB(colorArrays)}}>
                    <Image
                        className={styles['logo']}
                        width={150}
                        height={150}
                        priority={true}
                        src={market.imagePath || imagePlaceholder}
                        alt={"market logo " + market.name}
                        onLoad={(event) => getColorArrays(event.target)}/>
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