import {NextApiRequest, NextApiResponse} from "next";
import mockResults from '../../../../mocks/companyChart.json'
import {func} from "prop-types";

export type ChartData = {
    data: {
        stockValues: Array<number[]>
    }
}

export default async (req: NextApiRequest, res: NextApiResponse<ChartData>) => {

    const {symbol} = req.query
    const daysWithValues = (mockResults as any)['Time Series (Daily)']
    const daysKeys = Object.keys(daysWithValues) as any
    // const stockValues = daysKeys
    //     .map((dayString: string) => {
    //         const dayValues = dayString.split('-')
    //         const year = Number(dayValues[0])
    //         const month = Number(dayValues[1]) - 1
    //         const day = Number(dayValues[2])
    //
    //         if (isNaN(year) || isNaN(month) || isNaN(day)) {
    //             return null
    //         }
    //
    //         const utcDate = Date.UTC(year, month, day)
    //         return [utcDate, Number(daysWithValues[dayString]['4. close'])]
    //     })
    //     .filter((e: any) => !!e)
    //     .reverse()
    const stockValues = getMockStockValues()

    return res.status(200).json({data: {stockValues}})
}

function getMockStockValues(){
    const stockValues: Array<number[]> = []
    const totalYears = 2
    const finalYear = 2021
    let initialValue = 200
    const maxDiff = 10
    for(let i = 0; i < totalYears; i++){
        const year = finalYear - i
        for(let month =  11; month >= 0; month--){
            for (let day = 28; day > 0 ; day--){
                initialValue += (Math.random() - 0.5) * maxDiff
                stockValues.push([Date.UTC(year, month, day), initialValue])
            }
        }
    }
    return stockValues.reverse()
}