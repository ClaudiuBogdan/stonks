import Highcharts from 'highcharts/highstock';
import HighchartsReact from 'highcharts-react-official';
import HighchartsExporting from 'highcharts/modules/exporting'
import getChartOptions from "../../utils/chart";
import {useRef} from "react";


interface StockChartProps {
    stockValues: Array<number[]>
}


if (typeof Highcharts === 'object') {
    HighchartsExporting(Highcharts)
}

export default function StockChart({stockValues}: StockChartProps) {

    const isAvgActiveRef = useRef(true)

    const options = getChartOptions(isAvgActiveRef, stockValues)

    return (<div>
        <HighchartsReact
            highcharts={Highcharts}
            constructorType={'stockChart'}
            options={options}
        />
    </div>)
}
