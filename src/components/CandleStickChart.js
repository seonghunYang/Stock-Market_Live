import React from "react";
import PropTypes from "prop-types";
import { connect } from 'react-redux'

import { format } from "d3-format";
import { timeFormat } from "d3-time-format";

import { ChartCanvas, Chart } from "react-stockcharts";
import { BarSeries, CandlestickSeries } from "react-stockcharts/lib/series";
import { XAxis, YAxis } from "react-stockcharts/lib/axes";
import {
	CrossHairCursor,
	MouseCoordinateX,
	MouseCoordinateY
} from "react-stockcharts/lib/coordinates";

import { ClickCallback } from "react-stockcharts/lib/interactive";
import { discontinuousTimeScaleProvider } from "react-stockcharts/lib/scale";
import { OHLCTooltip } from "react-stockcharts/lib/tooltip";
import { fitWidth } from "react-stockcharts/lib/helper";
import { last } from "react-stockcharts/lib/utils";

import {SymbolSearchNews} from "../actions/news";

class CandleStickChart extends React.Component {
	render() {
		const { type, data: initialData, width, ratio, dateInfo, symbol, dispatch } = this.props;
		console.log(dateInfo);
		const xScaleProvider = discontinuousTimeScaleProvider.inputDateAccessor(
			d => d.date
		);
		const { data, xScale, xAccessor, displayXAccessor } = xScaleProvider(
			initialData
		);

		const start = xAccessor(last(data));
		const end = xAccessor(data[Math.max(0, data.length - dateInfo.number)]);
		const xExtents = [start, end];

		return (
			<ChartCanvas
				height={400}
				ratio={ratio}
				width={width}
				margin={{ left: 70, right: 70, top: 10, bottom: 30 }}
				type={type}
				seriesName="MSFT"
				data={data}
				xScale={xScale}
				xAccessor={xAccessor}
				displayXAccessor={displayXAccessor}
				xExtents={xExtents}
				onClick={(event) => {console.log(event)}}
			>
				<Chart id={1} yExtents={[d => [d.high, d.low]]}
				onClick={(event) => {console.log(event)}}>
					<XAxis axisAt="bottom" orient="bottom" />
					<YAxis axisAt="right" orient="right" ticks={5} />
					<MouseCoordinateY
						at="right"
						orient="right"
						displayFormat={format(".2f")}
					/>
					<CandlestickSeries />
					<ClickCallback
						onClick={ (moreProps) => { 
							console.log("onClick", moreProps.currentItem.date);
							dispatch(SymbolSearchNews(symbol, moreProps.currentItem.date, "1"))
						} }
					/>
					
					<OHLCTooltip forChart={1} origin={[-40, 0]} />
				</Chart>
				<Chart
					id={2}
					height={150}
					yExtents={d => d.volume}
					origin={(w, h) => [0, h - 150]}
					onClick={(event) => {console.log(event)}}
				>
					<YAxis
						axisAt="left"
						orient="left"
						ticks={5}
						tickFormat={format(".2s")}
					/>

					<MouseCoordinateX
						at="bottom"
						orient="bottom"
						displayFormat={timeFormat("%Y-%m-%d %H:%M %p")}
					/>
					<MouseCoordinateY
						at="left"
						orient="left"
						displayFormat={format(".4s")}
					/>

					<BarSeries
						yAccessor={d => d.volume}
						fill={d => (d.close > d.open ? "#6BA583" : "#FF0000")}
					/>
				</Chart>
				<CrossHairCursor />
			</ChartCanvas>
		);
	}
}

CandleStickChart.propTypes = {
	data: PropTypes.array.isRequired,
	width: PropTypes.number.isRequired,
	ratio: PropTypes.number.isRequired,
	type: PropTypes.oneOf(["svg", "hybrid"]).isRequired
};

CandleStickChart.defaultProps = {
	type: "svg"
};
CandleStickChart = fitWidth(
	CandleStickChart
);

export default connect(
	null,
	null
)(CandleStickChart)
