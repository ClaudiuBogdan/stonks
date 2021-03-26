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
    "matchScore": string,
    sparklines: number[],
}


export type MarketSection = {
    name: string,
    markets: MarketSuggestion[],
}

export type MarketSuggestionData = {
    data: {
        sections: MarketSection[]
    }
}

export default (req: NextApiRequest, res: NextApiResponse<MarketSuggestionData>) => {
    const {bestMatches} = mockResults

    //Parse mock results
    const results = bestMatches.slice(0, 4).map(e => ({
        symbol: e["1. symbol"],
        name: e["2. name"],
        type: e["3. type"],
        region: e["4. region"],
        marketOpen: e["5. marketOpen"],
        marketClose: e["6. marketClose"],
        timezone: e["7. timezone"],
        currency: e["8. currency"],
        matchScore: e["9. matchScore"],
        sparklines: generateSparkLine()
    }))

    const sections = [
        {
            name: 'Technology',
            markets: results
        },
        {
            name: 'Consumer Goods',
            markets: results
        },
        {
            name: 'Services',
            markets: results
        },
        {
            name: 'Financial',
            markets: results
        }
    ]

    return res.status(200).json({data: {sections}})
}

function generateSparkLine() {
    const sparklines: number [] = []

    const maxDiff = 50
    const totalValues = 200
    let sparkValue = 200

    for (let i = 0; i < totalValues; i++) {
        sparkValue += (Math.random() - 0.5) * maxDiff
        sparkValue = sparkValue > 0 ? sparkValue : 1
        sparklines.push(sparkValue)
    }

    return sparklines
}