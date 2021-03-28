import {breakpoints} from "../../utils/window";

export function getDetailedCardsPerView(size: number) {

    const defaultViews = 1

    if (size > breakpoints.screenXXl) {
        return 4
    }

    if (size > breakpoints.screenXl) {
        return 3.5
    }

    if (size > breakpoints.screenLd) {
        return 2.5
    }

    if (size > breakpoints.screenMd) {
        return 2
    }

    if (size > breakpoints.screenSm) {
        return 1.5
    }

    return defaultViews
}


export function getSecondaryCardsPerView(size: number) {

    const defaultViews = 2

    if (size > breakpoints.screenXXl) {
        return 8
    }

    if (size > breakpoints.screenXl) {
        return 6.5
    }

    if (size > breakpoints.screenLd) {
        return 4.5
    }

    if (size > breakpoints.screenMd) {
        return 4
    }

    if (size > breakpoints.screenSm) {
        return 3
    }

    return defaultViews
}

export const getSparklineOptions = (sparklines: number[], colors: { line: string, area: any }) => {
    return {
        chart: {
            backgroundColor: null,
            borderWidth: 0,
            type: 'area',
            margin: [0, 0, 0, 0],
            height: 40,
            animation: false,
            style: {
                overflow: 'visible'
            },
            // small optimization, saves 1-2 ms each sparkline
            skipClone: true
        },
        title: {
            text: ''
        },
        boost: {
            useGPUTranslations: true
        },
        credits: {
            enabled: false
        },
        xAxis: {
            labels: {
                enabled: false
            },
            title: {
                text: null
            },
            startOnTick: false,
            endOnTick: false,
            tickPositions: []
        },
        yAxis: {
            endOnTick: false,
            startOnTick: false,
            labels: {
                enabled: false
            },
            title: {
                text: null
            },
            tickPositions: [0]
        },
        legend: {
            enabled: false
        },
        tooltip: {
            enabled: false
        },
        plotOptions: {
            area: {
                lineColor: colors.line,
                lineWidth: 1,
                states: {
                    hover: {
                        enabled: false
                    }
                },
                marker: {
                    enabled: false,
                }
            },
            series: {
                boostThreshold: 30,
                gapSize: 1,
                animation: false,
            }
        },
        exporting: {
            enabled: false
        },
        series: [{
            data: sparklines,
            color: colors.area,
        }],
    };
}


const greenLine = '#0F0'
const redLine = '#F00'

const greenArea = {
    linearGradient: {x1: 0, x2: 0, y1: 0, y2: 1},
    stops: [
        [0, '#d2ffd2'],
        [1, '#f0fff0']
    ]
}

const redArea = {
    linearGradient: {x1: 0, x2: 0, y1: 0, y2: 1},
    stops: [
        [0, '#fde0e0'],
        [1, '#fff2f2']
    ]
}

export const sparkColors = {
    greenLine,
    redLine,
    greenArea,
    redArea
}