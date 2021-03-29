import process from "process";

export function isEmptyObject(obj: any) {
    return obj && Object.keys(obj).length === 0 && obj.constructor === Object
}

export function parseNumber(val: any) {
    if (Number.isNaN(Number(val))) {
        return null
    }
    return Number(val)
}

export function isDate(val: any) {
    return val instanceof Date
}