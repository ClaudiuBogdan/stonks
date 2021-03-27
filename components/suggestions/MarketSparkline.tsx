import Highcharts from "highcharts/highstock";
import HighchartsReact from "highcharts-react-official";

const getOptions = () => {
    return {
        chart: {
            backgroundColor: null,
            borderWidth: 0,
            type: 'area',
            margin: [0, 0, 0, 0],
            width: 200,
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
                lineColor: '#000',
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
                animation: false,
            }
        },
        exporting: {
            enabled: false
        },
        series: [{
            data: new Array(100).fill(0).map(encodeURI => Math.ceil(Math.random() * 100)),
        }],
    };
}

interface MarketSparklineProps {
    sparklines: number[]
}

export default function MarketSparkline({sparklines}: MarketSparklineProps) {

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

    const isGreen = sparklines[sparklines.length - 1] > sparklines[0]

    const colors = {
        line: isGreen ? greenLine : redLine,
        area: isGreen ? greenArea : redArea
    }

    const options = Highcharts.merge(getOptions(), {
        plotOptions: {
            area: {
                lineColor: colors.line
            }
        },
        series: [{
            data: sparklines,
            color: colors.area
        }],
    })

    return (
        <div>
            <HighchartsReact
                highcharts={Highcharts}
                constructorType={'chart'}
                options={options}
            />
        </div>
    )
}