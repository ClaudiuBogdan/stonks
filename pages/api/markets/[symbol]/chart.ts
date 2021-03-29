import {NextApiRequest, NextApiResponse} from "next";
import {Config} from "../../../../config";
import fetcher from "../../../../utils/fetcher";
import firebaseDB from "../../../../init/firebase";

export type ChartData = {
    data: {
        stockValues: Array<number[]>
    }
}

export default async (req: NextApiRequest, res: NextApiResponse<ChartData>) => {

    try {
        const {symbol: symbolQuery} = req.query
        const symbol = String(symbolQuery)

        if (!symbol || symbol === 'undefined') {
            throw Error('Symbol required')
        }

        const stockValues = await queryApiMarketStockValues(symbol)

        return res.status(200).json({data: {stockValues}})
    } catch (e) {
        // FIXME: For demo purpose only
        console.error(e)
        const stockValues = getMockStockValues()
        return res.status(200).json({data: {stockValues}})
    }
}

function getMockStockValues() {
    const stockValues: Array<number[]> = []
    const totalYears = 2
    const finalYear = 2021
    let initialValue = 200
    const maxDiff = 10
    for (let i = 0; i < totalYears; i++) {
        const year = finalYear - i
        for (let month = 11; month >= 0; month--) {
            for (let day = 28; day > 0; day--) {
                initialValue += (Math.random() - 0.5) * maxDiff
                stockValues.push([Date.UTC(year, month, day), initialValue])
            }
        }
    }
    return stockValues.reverse()
}


export async function queryApiMarketStockValues(symbol: string): Promise<Array<number[]>> {


    // Check if data exists in Firebase
    const marketRef = firebaseDB.collection('markets').doc(symbol);
    const marketDoc = await marketRef.get();

    // Check info from cache
    let stockValues = marketDoc.exists && marketDoc.data() && marketDoc.data()!.stockValues

    if (!stockValues) {
        // Get info from 3rd party

        const baseApiUrl = 'https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol'
        const timeSeriesUrl = `${baseApiUrl}=${symbol}&apikey=${Config.stockApi.alphavantage.key}`

        const response = await fetcher(timeSeriesUrl)

        if (!response || !response['Time Series (Daily)']) {
            return []
        }

        const daysWithValues = response['Time Series (Daily)']
        const daysKeys = Object.keys(daysWithValues) as any
        const stockValues = daysKeys
            .map((dayString: string) => {
                const dayValues = dayString.split('-')
                const year = Number(dayValues[0])
                const month = Number(dayValues[1]) - 1
                const day = Number(dayValues[2])

                if (isNaN(year) || isNaN(month) || isNaN(day)) {
                    return null
                }

                const utcDate = Date.UTC(year, month, day)
                return [utcDate, Number(daysWithValues[dayString]['4. close'])]
            })
            .filter((e: any) => !!e)
            .reverse()

        // Update Firebase entry
        await marketRef.set({stockValues: JSON.stringify(stockValues)}, {merge: true});
    } else {
        stockValues = JSON.parse(stockValues)
    }

    return stockValues
}