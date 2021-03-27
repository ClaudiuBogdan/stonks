export function getStockSummary(stockValues: number[]) {
    const currStockValue = stockValues[stockValues.length - 1]
    const prevStockValue = stockValues[stockValues.length - 2]
    const stockDayVariation = currStockValue - prevStockValue;
    const stockDayPercentage = 100 * stockDayVariation / prevStockValue

    const stockColor = stockDayVariation > 0 ? 'green' : 'red'

    return {currStockValue, stockDayVariation, stockDayPercentage, stockColor}
}