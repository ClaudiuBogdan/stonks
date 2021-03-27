import {useRouter} from "next/router";
import useSWR from "swr";
import fetcher from "../../utils/fetcher";
import {StockChart} from "../../components/charts";
import {ChartData} from "../api/markets/[symbol]/chart";
import {SearchBar} from "../../components/search";
import {MarketInfo} from "../../components/markets";
import {MarketInfoData} from "../api/markets/[symbol]/info";
import {Footer} from "../../components/footer";

export default function Markets() {
    const router = useRouter()
    const {symbol} = router.query

    // Get company info from API
    const {data: marketInfoData} = useSWR<MarketInfoData>(`/api/markets/${symbol}/info`, fetcher)
    // Get company stock values
    const {data: chartData} = useSWR<ChartData>(`/api/markets/${symbol}/chart`, fetcher)
    const marketInfo = marketInfoData && marketInfoData.data.info
    const stockValues = chartData && chartData.data.stockValues

    return (
        <div>
            <SearchBar/>
            {marketInfo && stockValues && (
                <div style={{margin: '0 10%'}}>
                    <MarketInfo
                        style={{marginTop: '2em'}}
                        marketInfo={marketInfo}/>
                    <StockChart
                        style={{marginTop: '2em'}}
                        {...{stockValues}}/>
                </div>)}
            <Footer/>
        </div>
    )
}
