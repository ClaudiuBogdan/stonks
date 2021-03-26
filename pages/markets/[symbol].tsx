import {useRouter} from "next/router";
import useSWR from "swr";
import fetcher from "../../utils/fetcher";
import {StockChart} from "../../components/charts";
import {ChartData} from "../api/markets/[symbol]/chart";
import {SearchBar} from "../../components/search";

export default function Markets() {
    const router = useRouter()
    const {symbol} = router.query

    // Get company info from API
    const {data: marketInfo} = useSWR(`/api/markets/${symbol}/info`, fetcher)
    // Get company stock values
    const {data: chartData} = useSWR<ChartData>(`/api/markets/${symbol}/chart`, fetcher)
    const stockValues = chartData && chartData.data.stockValues
    return (
        <div>
            <SearchBar/>
            <h1>Market page</h1>
            <h2>Company {symbol}</h2>
            <p>{JSON.stringify(marketInfo)}</p>
            {stockValues && <StockChart {...{stockValues}}/>}
        </div>
    )
}
