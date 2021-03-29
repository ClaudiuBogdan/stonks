import * as process from "process";
import {parseNumber} from "../utils/fn";

export const Config = {
    stockApi: {
        finnhub: {
            key: process.env.FINNHUB_KEY
        },
        alphavantage: {
            key: process.env.ALPHAVANTAGE_KEY
        }
    },
    firebase: {
        database: {
            credentials: process.env.FIREBASE_DATABASE_CREDENTIALS ?? '{}'
        }
    },
    suggestions: {
        updateLimit: parseNumber(process.env.SUGGESTIONS_UPDATE_LIMIT) ?? 24 * 60 * 60 * 1000 // Default to 1 day
    },
    baseUrl: process.env.BASE_URL ?? 'localhost:3000'
}