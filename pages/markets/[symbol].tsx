import {useRouter} from "next/router";
import useSWR from "swr";
import fetcher from "../../utils/fetcher";
import {StockChart} from "../../components/charts";
import {ChartData} from "../api/markets/[symbol]/chart";
import {SearchBar} from "../../components/search";
import {MarketInfo} from "../../components/markets";
import {MarketInfoData} from "../api/markets/[symbol]/info";
import styles from "../../styles/Market.module.scss";
import {Loading} from "../../components/loading";
import {Error} from "../../components/error";

export default function Markets() {
    const router = useRouter()
    const {symbol} = router.query

    // Get company info from API
    const {data: marketInfoData} = useSWR<MarketInfoData>(symbol ? `/api/markets/${symbol}/info` : null, fetcher)
    // Get company stock values
    const {data: chartData, error} = useSWR<ChartData>(symbol ? `/api/markets/${symbol}/chart` : null, fetcher)
    const marketInfo = marketInfoData && marketInfoData.data.info
    const stockValues = chartData && chartData.data.stockValues

    const isLoading = !error && !chartData

    return (
        <div>
            <SearchBar/>
            {marketInfo && stockValues && (
                <div className={styles['container']}>
                    <div className={styles['chart-container']}>
                        <h1 className={styles['market-title']}>
                            {marketInfo.Name} ({marketInfo.Symbol})
                        </h1>
                        <div className={styles['chart']}>
                            <StockChart
                                {...{stockValues}}/>
                        </div>
                    </div>
                    <div className={styles['info-container']}>
                        <MarketInfo
                            marketInfo={marketInfo}/>
                    </div>
                </div>)}

            {isLoading && <Loading/>}
            {error && <Error message={'Something went wrong'}/>}
        </div>
    )
}
