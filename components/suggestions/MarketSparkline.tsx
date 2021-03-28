import Highcharts from "highcharts/highstock";
import HighchartsReact from "highcharts-react-official";
import {getSparklineOptions, sparkColors} from "./utils";

interface MarketSparklineProps {
    sparklines: number[]
}

export default function MarketSparkline({sparklines}: MarketSparklineProps) {

    const isGreen = sparklines[sparklines.length - 1] > sparklines[0]

    const {greenLine, greenArea, redLine, redArea} = sparkColors

    const colors = {
        line: isGreen ? greenLine : redLine,
        area: isGreen ? greenArea : redArea
    }

    const options = getSparklineOptions(sparklines, colors)

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