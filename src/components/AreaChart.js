import React from "react";
import PropTypes from "prop-types";

import { curveMonotoneX } from "d3-shape";

import { ChartCanvas, Chart } from "react-stockcharts";
import { AreaSeries } from "react-stockcharts/lib/series";
import { XAxis, YAxis } from "react-stockcharts/lib/axes";
import { fitWidth } from "react-stockcharts/lib/helper";
import { createVerticalLinearGradient, hexToRGBA } from "react-stockcharts/lib/utils";

import { discontinuousTimeScaleProvider } from "react-stockcharts/lib/scale";
import { last } from "react-stockcharts/lib/utils";

const canvasGradient = createVerticalLinearGradient([
	{ stop: 0, color: hexToRGBA("#b5d0ff", 0.2) },
	{ stop: 0.7, color: hexToRGBA("#6fa4fc", 0.4) },
	{ stop: 1, color: hexToRGBA("#4286f4", 0.8) },
]);


class AreaChart extends React.Component {
  render() {
		const { type, data: initialData, width, ratio, dateInfo } = this.props;
    const xScaleProvider = discontinuousTimeScaleProvider.inputDateAccessor(
			d => d.date
    );

    const { data, xScale, xAccessor, displayXAccessor } = xScaleProvider(
			initialData
    );
    const start = xAccessor(last(data));
		const end = xAccessor(data[Math.max(0, data.length - dateInfo.number)]);
		const xExtents = [start, end];
    
    return(
      <ChartCanvas ratio={ratio} width={width}  height={400}
      margin={{ left: 50, right: 50, top: 10, bottom: 30 }}
      seriesName="MSFT"
      data={data} type={type}
      xAccessor={xAccessor}
      displayXAccessor={displayXAccessor}
      xScale={xScale}
      xExtents={xExtents}
    >
			<Chart id={0} yExtents={d => d.close}>
        <defs>
          <linearGradient id="MyGradient" x1="0" y1="100%" x2="0" y2="0%">
            <stop offset="0%" stopColor="#b5d0ff" stopOpacity={0.2} />
            <stop offset="70%" stopColor="#6fa4fc" stopOpacity={0.4} />
            <stop offset="100%"  stopColor="#4286f4" stopOpacity={0.8} />
          </linearGradient>
          </defs>
          <XAxis axisAt="bottom" orient="bottom" ticks={5} />
					<YAxis axisAt="left" orient="left" />
          <AreaSeries
						yAccessor={d => d.close }
						fill="url(#MyGradient)"
						strokeWidth={2}
						interpolation={curveMonotoneX}
						canvasGradient={canvasGradient}
					/>
      </Chart>
    </ChartCanvas>
    )
  }
}


AreaChart.propTypes = {
	data: PropTypes.array.isRequired,
	width: PropTypes.number.isRequired,
	ratio: PropTypes.number.isRequired,
	type: PropTypes.oneOf(["svg", "hybrid"]).isRequired,
};

AreaChart.defaultProps = {
	type: "svg",
};

AreaChart = fitWidth(AreaChart);

export default AreaChart;