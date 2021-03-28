import * as process from "process";

export const Config = {
    baseUrl: process.env.BASE_URL ?? 'localhost:3000'
}