import {NextApiRequest, NextApiResponse} from "next";
import mockResults from '../../../../mocks/companyChart.json'

export type ChartData = {
    data: {
        stockValues: Array<number[]>
    }
}

export default async (req: NextApiRequest, res: NextApiResponse<ChartData>) => {

    const {symbol} = req.query
    const daysWithValues = (mockResults as any)['Time Series (Daily)']
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

    return res.status(200).json({data: {stockValues}})
}
