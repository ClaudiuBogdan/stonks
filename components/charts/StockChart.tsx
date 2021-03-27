import Highcharts from 'highcharts/highstock';
import HighchartsReact from 'highcharts-react-official';
import HighchartsExporting from 'highcharts/modules/exporting'
import getChartOptions from "../../utils/chart";
import {CSSProperties, useRef} from "react";


interface StockChartProps {
    stockValues: Array<number[]>
    style?: CSSProperties
}


if (typeof Highcharts === 'object') {
    HighchartsExporting(Highcharts)
}

export default function StockChart({stockValues, style}: StockChartProps) {

    const isAvgActiveRef = useRef(true)

    // FIXME: recalculate average on search navigation
    const options = getChartOptions(isAvgActiveRef, stockValues)

    return (<div {...{style}}>
        <HighchartsReact
            containerProps={{ style: {padding: '0 1rem 0 0'} }}
            highcharts={Highcharts}
            constructorType={'stockChart'}
            options={options}
        />
    </div>)
}
