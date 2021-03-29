// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import {NextApiRequest, NextApiResponse} from "next";
import firebaseDB from "../../../init/firebase";
import {queryApiMarketInfo} from "../markets/[symbol]/info";
import {queryApiMarketStockValues} from "../markets/[symbol]/chart";
import {Config} from "../../../config";

export type MarketSuggestion = {
    symbol: string,
    summary: {
        "symbol": string,
        "name": string,
        "type": string,
        "country": string,
        "currency": string,
    }
    sparklines: number[],
    imagePath?: string
    imageColor?: string
}


export type MarketSection = {
    name: string,
    lastUpdate: Date | { seconds: number, toDate: () => Date },
    markets: MarketSuggestion[],
    isTop: boolean,
}

export type MarketSuggestionData = {
    data: {
        topSections?: MarketSection[],
        sections: MarketSection[]
    }
}

export default async (req: NextApiRequest, res: NextApiResponse<MarketSuggestionData>) => {

    const {sections, topSections} = await queryApiSuggestions()

    return res.status(200).json({data: {topSections, sections}})
}

async function queryApiSuggestions() {

    let topSections: MarketSection[] = []
    let sections: MarketSection[] = []

    // Get suggestions from database
    const suggestionsRef = firebaseDB.collection('suggestions');
    const suggestionDocs = await suggestionsRef.get();

    const hasSuggestionsData = suggestionDocs.size > 0

    // If not suggestions, seed the database
    if (!hasSuggestionsData) {
        const seededSections = await seedSections()

        await Promise.all(seededSections.map((section) => {
            return firebaseDB
                .collection('suggestions')
                .doc(section.name)
                .set(section);
        }))

        sections = seededSections.filter(section => !section.isTop)
        topSections = seededSections.filter(section => section.isTop)
    } else {
        const updatePromises = suggestionDocs.docs.map(async (doc): Promise<MarketSection> => {
            let section = doc.data() as MarketSection

            const updateTimeLimit = Config.suggestions.updateLimit
            const lastUpdate: Date = section.lastUpdate instanceof Date ? section.lastUpdate : section.lastUpdate.toDate()

            if (!section.lastUpdate || Date.now() - lastUpdate.getTime() > updateTimeLimit) {
                section = await updateSuggestedSection(section)
            }
            return section
        });

        const storedSections = await Promise.all(updatePromises)

        sections = storedSections.filter(section => !section.isTop)
        topSections = storedSections.filter(section => section.isTop)
    }

    // If last update is more than a day, update time series


    return {sections, topSections}
}

async function seedSections() {
    const sections: MarketSection[] = [
        {
            name: 'Technology',
            isTop: true,
            lastUpdate: new Date(),
            markets: [
                {
                    symbol: 'FB',
                    imagePath: '/assets/companies/150x150/facebook.png',
                    imageColor: '',
                    summary: {} as any,
                    sparklines: []
                },
                {
                    symbol: 'GOOG',
                    imagePath: '/assets/companies/150x150/google.png',
                    imageColor: '',
                    summary: {} as any,
                    sparklines: []
                },
                {
                    symbol: 'INTC',
                    imagePath: '/assets/companies/150x150/intel.png',
                    imageColor: '',
                    summary: {} as any,
                    sparklines: []
                },
                {
                    symbol: 'TSLA',
                    imagePath: '/assets/companies/150x150/tesla.png',
                    imageColor: '',
                    summary: {} as any,
                    sparklines: []
                },
                {
                    symbol: 'ZM',
                    imagePath: '/assets/companies/150x150/zoom.png',
                    imageColor: '',
                    summary: {} as any,
                    sparklines: []
                },
                {
                    symbol: 'GME',
                    imagePath: '/assets/companies/150x150/gme.png',
                    imageColor: '',
                    summary: {} as any,
                    sparklines: []
                },
            ]
        },
        {
            name: 'Consumer Goods',
            lastUpdate: new Date(),
            isTop: false,
            markets: [
                {
                    symbol: 'PG',
                    imagePath: '/assets/companies/150x150/pg.png',
                    summary: {} as any,
                    sparklines: []
                },
                {
                    symbol: 'PEP',
                    imagePath: '/assets/companies/150x150/pep.png',
                    summary: {} as any,
                    sparklines: []
                },
                {
                    symbol: 'COST',
                    imagePath: '/assets/companies/150x150/cost.png',
                    summary: {} as any,
                    sparklines: []
                },
                {
                    symbol: 'NKE',
                    imagePath: '/assets/companies/150x150/nke.png',
                    summary: {} as any,
                    sparklines: []
                },
                {
                    symbol: 'SBUX',
                    imagePath: '/assets/companies/150x150/sbux.png',
                    summary: {} as any,
                    sparklines: []
                },
                {
                    symbol: 'MCD',
                    imagePath: '/assets/companies/150x150/mcd.png',
                    summary: {} as any,
                    sparklines: []
                },
                {
                    symbol: 'DIS',
                    imagePath: '/assets/companies/150x150/dis.png',
                    summary: {} as any,
                    sparklines: []
                },
                {
                    symbol: 'TJX',
                    imagePath: '/assets/companies/150x150/tjx.png',
                    summary: {} as any,
                    sparklines: []
                },
                {
                    symbol: 'KO',
                    imagePath: '/assets/companies/150x150/ko.png',
                    summary: {} as any,
                    sparklines: []
                }
            ]
        },
        // {
        //     name: 'Services',
        //     lastUpdate: new Date(),
        //     isTop: false,
        //     markets: [
        //         {
        //             symbol: 'scha.ol',
        //             imagePath: '',
        //             summary: {} as any,
        //             sparklines: []
        //         },
        //         {
        //             symbol: 'spt.l',
        //             imagePath: '',
        //             summary: {} as any,
        //             sparklines: []
        //         },
        //         {
        //             symbol: 'sax.de',
        //             imagePath: '',
        //             summary: {} as any,
        //             sparklines: []
        //         },
        //         {
        //             symbol: 'aht.l',
        //             imagePath: '',
        //             summary: {} as any,
        //             sparklines: []
        //         },
        //         {
        //             symbol: 'stb.ol',
        //             imagePath: '',
        //             summary: {} as any,
        //             sparklines: []
        //         },
        //         {
        //             symbol: 'aden.zu',
        //             imagePath: '',
        //             summary: {} as any,
        //             sparklines: []
        //         }
        //     ]
        // },
        // {
        //     name: 'Financial',
        //     lastUpdate: new Date(),
        //     isTop: false,
        //     markets: [
        //         {
        //             symbol: 'mgam.l',
        //             imagePath: '',
        //             summary: {} as any,
        //             sparklines: []
        //         },
        //         {
        //             symbol: 'pnn.l',
        //             imagePath: '',
        //             summary: {} as any,
        //             sparklines: []
        //         },
        //         {
        //             symbol: 'jysk.co',
        //             imagePath: '',
        //             summary: {} as any,
        //             sparklines: []
        //         },
        //         {
        //             symbol: '778.hk',
        //             imagePath: '',
        //             summary: {} as any,
        //             sparklines: []
        //         },
        //         {
        //             symbol: 'sampo.he',
        //             imagePath: '',
        //             summary: {} as any,
        //             sparklines: []
        //         },
        //     ]
        // }
    ]

    // Get marget summary and sparkline

    for (let section of sections) {
        for (let market of section.markets) {

            // Get info data
            const info = await queryApiMarketInfo(market.symbol)

            // Parse info data
            market.summary = parseSummary(info)

            if (!market.summary.symbol) {
                console.log("No data: ", market.symbol)
            }

            // Get time series
            market.sparklines = await getMarketSparklines(market.symbol)

            // await new Promise(resolve => setTimeout(resolve, 30 * 1000))
        }
    }


    return sections
}

function parseSummary(info: any) {
    return {
        symbol: info["Symbol"],
        name: info["Name"],
        type: info["AssetType"],
        country: info["Country"],
        currency: info["Currency"]
    }
}

async function updateSuggestedSection(section: MarketSection): Promise<MarketSection> {
    const updateMarketPromises = section.markets.map(async (market): Promise<MarketSuggestion> => {
        return {
            ...market,
            sparklines: await getMarketSparklines(market.symbol)
        }
    })

    const markets = await Promise.all(updateMarketPromises)

    const newSection = {
        ...section,
        markets,
        lastUpdate: new Date()
    }

    await firebaseDB
        .collection('suggestions')
        .doc(newSection.name)
        .update(newSection);

    return newSection

}

async function getMarketSparklines(symbol: string) {
    const stockValues = await queryApiMarketStockValues(symbol)

    // No historical data available
    if (!stockValues) {
        return []
    }

    // Get only the last 30 days
    const daysLimit = 30
    const lastIndex = stockValues.length
    const startIndex = Math.max(0, lastIndex - daysLimit)


    // Parse sparklines
    return stockValues
        .slice(startIndex, lastIndex)
        .map(e => e[1])
}