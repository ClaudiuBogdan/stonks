import Highcharts from "highcharts/highstock";
import HighchartsReact from "highcharts-react-official";

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
                animation: true,
                lineWidth: 1,
                shadow: false,
                fillOpacity: 0.25
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

export default function MarketSparkline() {

    const options = getOptions()

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