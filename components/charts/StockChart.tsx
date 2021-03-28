import Highcharts from 'highcharts/highstock';
import HighchartsReact from 'highcharts-react-official';
import HighchartsExporting from 'highcharts/modules/exporting'
import getChartOptions from "../../utils/chart";
import {CSSProperties, useRef} from "react";
import {breakpoints, useWindowSize} from "../../utils/window";


interface StockChartProps {
    stockValues: Array<number[]>
    style?: CSSProperties
}


if (typeof Highcharts === 'object') {
    HighchartsExporting(Highcharts)
}

export default function StockChart({stockValues, style}: StockChartProps) {

    const isAvgActiveRef = useRef<boolean>(true)
    const windowSize = useWindowSize()

    // Fixes hidden right side on page load
    const chartPadding = windowSize.width < breakpoints.screenSm ? {padding: '0 1rem 0 0'} : {}

    const options = getChartOptions(isAvgActiveRef, stockValues)

    return (<div {...{style}}>
        <HighchartsReact
            containerProps={{style: {...chartPadding}}}
            highcharts={Highcharts}
            constructorType={'stockChart'}
            options={options}
        />
    </div>)
}
