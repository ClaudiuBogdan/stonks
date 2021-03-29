import {NextApiRequest, NextApiResponse} from "next";
import mockResults from '../../../../mocks/companyInfo.json'
import {Config} from "../../../../config";
import fetcher from "../../../../utils/fetcher";
import firebaseDB from "../../../../init/firebase";

export type MarketInfo = {
    "Symbol": string,
    "AssetType": string,
    "Name": string,
    "Description": string,
    "Exchange": string,
    "Currency": string,
    "Country": string,
    "Sector": string,
    "Industry": string,
    "Address": string,
    "FullTimeEmployees": string,
    "FiscalYearEnd": string,
    "LatestQuarter": string,
    "MarketCapitalization": string,
    "EBITDA": string,
    "PERatio": string,
    "PEGRatio": string,
    "BookValue": string,
    "DividendPerShare": string,
    "DividendYield": string,
    "EPS": string,
    "RevenuePerShareTTM": string,
    "ProfitMargin": string,
    "OperatingMarginTTM": string,
    "ReturnOnAssetsTTM": string,
    "ReturnOnEquityTTM": string,
    "RevenueTTM": string,
    "GrossProfitTTM": string,
    "DilutedEPSTTM": string,
    "QuarterlyEarningsGrowthYOY": string,
    "QuarterlyRevenueGrowthYOY": string,
    "AnalystTargetPrice": string,
    "TrailingPE": string,
    "ForwardPE": string,
    "PriceToSalesRatioTTM": string,
    "PriceToBookRatio": string,
    "EVToRevenue": string,
    "EVToEBITDA": string,
    "Beta": string,
    "52WeekHigh": string,
    "52WeekLow": string,
    "50DayMovingAverage": string,
    "200DayMovingAverage": string,
    "SharesOutstanding": string,
    "SharesFloat": string,
    "SharesShort": string,
    "SharesShortPriorMonth": string,
    "ShortRatio": string,
    "ShortPercentOutstanding": string,
    "ShortPercentFloat": string,
    "PercentInsiders": string,
    "PercentInstitutions": string,
    "ForwardAnnualDividendRate": string,
    "ForwardAnnualDividendYield": string,
    "PayoutRatio": string,
    "DividendDate": string,
    "ExDividendDate": string,
    "LastSplitFactor": string,
    "LastSplitDate": string
}

export type MarketInfoData = {
    data: {
        info: MarketInfo
    }
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const {symbol: symbolQuery} = req.query
        const symbol = String(symbolQuery)

        if (!symbol || symbol === 'undefined') {
            throw Error('Symbol required')
        }

        const info = await queryApiMarketInfo(symbol)

        return res.status(200).json({data: {info}})
    } catch (e) {
        // FIXME: For demo purpose only
        return res.status(200).json({data: {info: mockResults}})
    }

}

async function queryApiMarketInfo(symbol: string) {

    // Check if data exists in Firebase
    const marketRef = firebaseDB.collection('markets').doc(symbol);
    const marketDoc = await marketRef.get();

    // Check info from cache
    let info = marketDoc.exists && marketDoc.data() && marketDoc.data()!.info

    if (!info) {
        // Get info from 3rd party
        const baseApiUrl = 'https://www.alphavantage.co/query?function=OVERVIEW&symbol'
        const marketInfoUrl = `${baseApiUrl}=${symbol}&apikey=${Config.stockApi.alphavantage.key}`
        info = await fetcher(marketInfoUrl)

        // Update Firebase entry
        await marketRef.set({info}, {merge: true});
    }

    return info
}