// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import {NextApiRequest, NextApiResponse} from "next";
import mockResults from '../../../mocks/searchResults.json'
import firebaseDB from "../../../init/firebase";

export type MarketSuggestion = {
    symbol: string,
    summary: {
        "symbol": string,
        "name": string,
        "type": string,
        "region": string,
        "marketOpen": string,
        "marketClose": string,
        "timezone": string,
        "currency": string,
        "matchScore": string,
    }
    sparklines: number[],
    imagePath?: string
    backgroundColor?: string
}


export type MarketSection = {
    name: string,
    //TODO: add last update
    markets: MarketSuggestion[],
    isTop?: boolean,
}

export type MarketSuggestionData = {
    data: {
        topSections?: MarketSection[],
        sections: MarketSection[]
    }
}

export default async (req: NextApiRequest, res: NextApiResponse<MarketSuggestionData>) => {
    const {bestMatches} = mockResults

    const snapshot = await firebaseDB.collection('markets').get();
    snapshot.forEach((doc) => {
        console.log("doc.id, '=>', doc.data())");
    });


    //Parse mock results
    const results = bestMatches.slice(0, 4).map(e => ({
        symbol: e["1. symbol"],
        summary: {
            symbol: e["1. symbol"],
            name: e["2. name"],
            type: e["3. type"],
            region: e["4. region"],
            marketOpen: e["5. marketOpen"],
            marketClose: e["6. marketClose"],
            timezone: e["7. timezone"],
            currency: e["8. currency"],
            matchScore: e["9. matchScore"],
        },
        sparklines: generateSparkLine(),
        imagePath: '/assets/companies/70x70/placeholder.png'
    }))

    const images = [
        '/assets/companies/150x150/facebook.png',
        '/assets/companies/150x150/google.png',
        '/assets/companies/150x150/intel.png',
        '/assets/companies/150x150/tesla.png',
    ]

    const topSections = [
        {
            name: 'Technology',
            markets: bestMatches.slice(0, 4).map((e, i) => ({
                symbol: e["1. symbol"],
                summary: {
                    symbol: e["1. symbol"],
                    name: e["2. name"],
                    type: e["3. type"],
                    region: e["4. region"],
                    marketOpen: e["5. marketOpen"],
                    marketClose: e["6. marketClose"],
                    timezone: e["7. timezone"],
                    currency: e["8. currency"],
                    matchScore: e["9. matchScore"],
                },
                sparklines: generateSparkLine(),
                imagePath: images[i]
            }))
        },
    ]

    const sections = [

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

    return res.status(200).json({data: {topSections, sections}})
}

function generateSparkLine() {
    const sparklines: number [] = []

    const maxDiff = 50
    const totalValues = 30
    let sparkValue = 200

    for (let i = 0; i < totalValues; i++) {
        sparkValue += (Math.random() - 0.5) * maxDiff
        sparkValue = sparkValue > 0 ? sparkValue : 1
        sparklines.push(sparkValue)
    }

    return sparklines
}