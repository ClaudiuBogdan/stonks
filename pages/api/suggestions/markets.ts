// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import {NextApiRequest, NextApiResponse} from "next";
import mockResults from '../../../mocks/searchResults.json'

export type MarketSuggestion = {
    "symbol": string,
    "name": string,
    "type": string,
    "region": string,
    "marketOpen": string,
    "marketClose": string,
    "timezone": string,
    "currency": string,
    "matchScore": string
}

export type MarketSuggestionData = {
    data: MarketSuggestion[]
}

export default (req: NextApiRequest, res: NextApiResponse<MarketSuggestionData>) => {
    const {bestMatches} = mockResults

    //Parse mock results
    const results = bestMatches.slice(0,3).map(e => ({
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

    return res.status(200).json({data: results})
}
