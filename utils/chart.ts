import {MutableRefObject} from "react";
import Highcharts from "highcharts/highstock";
import {YAxisPlotLinesOptions} from "highcharts";

const getChartOptions = (isAvgActiveRef: MutableRefObject<boolean>, stockValues: Array<number[]>) => {

    const toggleAverageLine = (axis: any) => {
        if (isAvgActiveRef.current) {
            removeAvgLine(axis)
            isAvgActiveRef.current = false
        } else {
            addAvgLine(axis)
            isAvgActiveRef.current = true
        }
    }

    return {
        chart: {
            backgroundColor: null,
            borderWidth: 1,
            events: {
                load: function () {
                    const chart = this as unknown as Highcharts.Chart
                    if (isAvgActiveRef.current) {
                        addAvgLine(chart.get('xA0'));
                    }
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
                    if (isAvgActiveRef.current) {
                        addAvgLine(this);
                    }
                }
            }
        },
        series: [{
            name: 'USD to EUR',
            data: stockValues
        }],
        responsive: {
            rules: [{
                condition: {
                    maxWidth: 500
                },
                chartOptions: {
                    legend: {
                        align: 'center',
                        verticalAlign: 'bottom',
                        layout: 'horizontal'
                    }
                }
            }]
        },
        exporting: {
            buttons: [{
                text: 'Average',
                x: -250,
                y: -2,
                onclick: function () {
                    const chart = this as unknown as Highcharts.Chart
                    if (!chart) {
                        return
                    }
                    const axis = chart.get('xA0')
                    toggleAverageLine(axis);
                },
                theme: {
                    'stroke-width': 1,
                    stroke: 'silver',
                    r: 0,
                    states: {
                        hover: {
                            fill: '#eee'
                        },
                    }
                }
            }]
        }
    };
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

export default getChartOptions;