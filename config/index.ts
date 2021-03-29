import * as process from "process";

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
    baseUrl: process.env.BASE_URL ?? 'localhost:3000'
}