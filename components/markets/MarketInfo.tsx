import {CSSProperties} from "react";
import {MarketInfo as MarketInfoType} from "../../pages/api/markets/[symbol]/info";
import styles from './styles/MarketInfo.module.scss';

interface MarketInfoProps {
    marketInfo: MarketInfoType
    style?: CSSProperties
}

export default function MarketInfo({marketInfo, style = {}}: MarketInfoProps) {

    const marketInfoIndicators: (keyof MarketInfoType)[] = [
        // "Address",
        "Name",
        "Symbol",
        "Exchange",
        "Currency",
        "Country",
        "Sector",
        "Industry",
        "EBITDA",
        "PERatio",
        "PEGRatio",
        "DividendPerShare",
        "DividendYield",
        "EPS",
        "ProfitMargin",
        "RevenueTTM",
        "GrossProfitTTM",
        "DilutedEPSTTM",
        "TrailingPE",
        "ForwardPE",
        "PriceToBookRatio",
        "EVToRevenue",
        "EVToEBITDA",
        "52WeekHigh",
        "52WeekLow",
        // "Beta",
        // "SharesOutstanding",
        // "ShortRatio",
        // "PercentInsiders",
        // "PercentInstitutions",
        // "PayoutRatio",
    ]

    return (
        <div className={styles['info-container']} {...{style}}>
            <div className={styles['info-section']}>
                <div className={styles['summary-container']}>
                    {marketInfoIndicators.map((key) => (
                        <div
                            className={styles['summary-item']}
                            key={key}>
                            <div>
                                <span>{key}</span>
                            </div>
                            <div>
                                <strong>{marketInfo[key]}</strong>
                            </div>
                        </div>))
                    }
                </div>
            </div>
            <div className={styles['info-section']}>
                <p className={styles['description']}>
                    {marketInfo.Description}
                </p>
            </div>
        </div>
    )
}
