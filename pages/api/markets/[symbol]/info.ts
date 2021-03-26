import {NextApiRequest, NextApiResponse} from "next";
import mockResults from '../../../../mocks/companyInfo.json'

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

    const {symbol} = req.query
    return res.status(200).json({data: {info: mockResults}})
}
