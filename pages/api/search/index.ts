// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import {NextApiRequest, NextApiResponse} from "next";
import mockResults from '../../../mocks/searchResults.json'
import fetcher from "../../../utils/fetcher";
import {Config} from "../../../config";

export type SearchResult = {
    description: string,
    displaySymbol: string,
    symbol: string,
    type: string
}

export type SearchData = {
    data: SearchResult[]
}

export default async (req: NextApiRequest, res: NextApiResponse<SearchData>) => {

    const {q} = req.query

    // FIXME: change search api for more accurate results
    const searchUrl = `https://finnhub.io/api/v1/search?q=${q}&token=${Config.stockApi.finnhub.key}`

    try {
        const response = await fetcher(searchUrl)
        const results = response.result.splice(0, 5)
        return res.status(200).json({data: results})
    } catch (e) {
        return res.status(500)
    }
}

function getMockResults() {

    const {bestMatches} = mockResults

    return bestMatches.map(e => ({
        symbol: e["1. symbol"],
        name: e["2. name"],
        type: e["3. type"],
        region: e["4. region"],
        marketOpen: e["5. marketOpen"],
        marketClose: e["6. marketClose"],
        timezone: e["7. timezone"],
        currency: e["8. currency"],
        matchScore: e["9. matchScore"]
    }))
}