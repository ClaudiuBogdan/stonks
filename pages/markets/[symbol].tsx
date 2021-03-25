import {useRouter} from "next/router";
import useSWR from "swr";
import fetcher from "../../utils/fetcher";
import {StockChart} from "../../components/charts";

export default function Markets() {
    const router = useRouter()
    const { symbol } = router.query
    // TODO: Get company info from API
    const {data: marketInfo} = useSWR(`/api/markets/${symbol}/info`, fetcher)
    const {data: marketChart} = useSWR(`/api/markets/${symbol}/chart`, fetcher)

    //TODO: Get company stock values

    return (
        <div>
            <h1>Market page</h1>
            <h2>Company {symbol}</h2>
            <StockChart/>
            <p>{JSON.stringify(marketInfo)}</p>
            <p>{JSON.stringify(marketChart)}</p>
        </div>
    )
}
