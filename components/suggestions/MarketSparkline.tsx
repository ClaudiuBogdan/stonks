import Highcharts from "highcharts/highstock";
import HighchartsReact from "highcharts-react-official";
import {green} from "colorette";

const getOptions = () => {
    return {
        chart: {
            backgroundColor: null,
            borderWidth: 0,
            type: 'area',
            margin: [2, 0, 2, 0],
            width: 200,
            height: 60,
            style: {
                overflow: 'visible'
            },

            // small optimalization, saves 1-2 ms each sparkline
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
            series: {
                animation: false,
                lineWidth: 1,
                shadow: false,
                fillOpacity: 1
            },
        },
        exporting: {
            enabled: false
        },
        series: [{
            data: new Array(100).fill(0).map(encodeURI => Math.ceil(Math.random() * 100)),
        }],
    };
}

interface MarketSparklineProps{
    sparklines: number[]
}

export default function MarketSparkline({sparklines}: MarketSparklineProps) {

    const greenColor =  {
        linearGradient: { x1: 0, x2: 0, y1: 0, y2: 1 },
        stops: [
            [0, '#7ff889'],
            [1, '#b3ffb3']
        ]
    }

    const redColor =  {
        linearGradient: { x1: 0, x2: 0, y1: 0, y2: 1 },
        stops: [
            [0, '#ff4f4f'],
            [1, '#fdbfbf']
        ]
    }

    const options = Highcharts.merge(getOptions(), {
        series: [{
            data: sparklines,
            color: Math.random() > 0.5 ? redColor : greenColor
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