import Highcharts from 'highcharts/highstock';
import HighchartsReact from 'highcharts-react-official';
import HighchartsExporting from 'highcharts/modules/exporting'
import usdEurMock from "../../mocks/chartValues";
import {Axis, YAxisPlotLinesOptions} from "highcharts";

interface StockChartProps {

}

let isAvgActive = true;


if (typeof Highcharts === 'object') {
    HighchartsExporting(Highcharts)
}

export default function StockChart({}: StockChartProps) {
    const options = {

        chart: {
            events: {
                load: function () {
                    const chart = this as unknown as Highcharts.Chart
                    addAvgLine(chart.get('xA0'));
                }
            }
        },

        yAxis: [{
            id: 'yA0'
        }],

        xAxis: {
            id: 'xA0',
            events: {
                afterSetExtremes: function () {
                    addAvgLine(this);
                }
            }
        },
        series: [{
            name: 'USD to EUR',
            data: usdEurMock
        }],
        exporting: {
            buttons: {
                customButton: {
                    x: -300,
                    onclick: function () {
                        const chart = this as unknown as Highcharts.Chart
                        if (!chart) {
                            return
                        }
                        const axis = chart.get('xA0')
                        toggleAverageLine(axis);
                    },
                    symbol: 'circle'
                }
            }
        }
    };

    return (<div>
        <HighchartsReact
            highcharts={Highcharts}
            constructorType={'stockChart'}
            options={options}
        />
    </div>)
}

const addAvgLine = (axis: any /*Axis*/) => {
    const points = axis.series[0].points,
        len = points.length;

    let point = {isInside: false, y: 0, x: 0}
    let avg = 0
    let avgLength = 0
    let total = 0

    for (let i = 0; i < len; i++) {
        point = points[i];
        if (point.isInside) {
            total += point.y;
            avgLength++;
        }
    }

    avg = (total / avgLength)

    const options: YAxisPlotLinesOptions = {
        id: 'avg',
        value: avg,
        color: 'red',
        dashStyle: 'Dash',
        width: 1,
        label: {
            text: avg.toFixed(6)
        },
        zIndex: 4
    }
    //try
    axis.chart.get('yA0').removePlotLine('avg');
    axis.chart.get('yA0').addPlotLine(options);
}


const removeAvgLine = (axis: any /*Axis*/) => {
    axis.chart.get('yA0').removePlotLine('avg');
}

const toggleAverageLine = (axis: any) => {
    if (isAvgActive) {
        removeAvgLine(axis)
        isAvgActive = false
    } else {
        addAvgLine(axis)
        isAvgActive = true
    }
}
