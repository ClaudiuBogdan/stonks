import {MarketInfo as MarketInfoType} from "../../pages/api/markets/[symbol]/info";
import styles from './MarketInfo.module.scss';

interface MarketInfoProps {
    marketInfo: MarketInfoType
}

export default function MarketInfo({marketInfo}: MarketInfoProps) {

    const marketInfoIndicators = [
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

    return (<div>
        <div className={styles['info-container']}>
            <div className={styles['info-section']}>
                <div className={styles['summary-container']}>
                    {marketInfoIndicators.map((key) => (
                        <div
                            className={styles['summary-item']}
                            key={key}>
                            <div>
                                {key}
                            </div>
                            <div>
                                <strong>{marketInfo[key]}</strong>
                            </div>
                        </div>))
                    }
                </div>
            </div>
            <div className={styles['info-section']}>
                {marketInfo.Description}
            </div>
        </div>
    </div>)
}
