import React from 'react';
import PropTypes from 'prop-types';
import { LineChart, Line, CartesianGrid, Tooltip, YAxis, XAxis, Label } from 'recharts';
import { expandToGrid } from '../Dashboard';

const plotterSampleValues = Array(100)
  .fill(0)
  .map((_, i) => ({
    value: Math.sin((i / 100) * Math.PI * 2) - 0.5 * Math.cos((i / 25) * Math.PI * 2)
  }));

export default class AttributePlotter extends React.Component {
  constructor(props) {
    super(props);
    const time = new Date().getTime();
    this.state = {
      values: [],
      startTime: time
    };
  }

  componentWillReceiveProps(newProps) {
    const { mode } = this.props;
    if (mode === 'edit' || mode === 'library') {
      return;
    }

    let { values } = this.state;
    const { startTime } = this.state;
    const newValue = newProps.value;
    // Difference in seconds between "now" and when the plot was created, rounded to one decimal place.
    const newTime = Math.round((10 * (new Date().getTime() - startTime)) / 1000) / 10;
    if (values.length === 0 || newValue !== values.slice(-1)[0].value) {
      values = [...values, { value: newValue, time: newTime }];
      this.setState({ values });
    }
  }

  render() {
    const { mode, params } = this.props;
    let { values } = this.state;
    const liveMode = mode !== 'edit' && mode !== 'library';
    values = liveMode ? values : plotterSampleValues;

    const { nbrDataPoints, width, height, showGrid, yAxisLabel, strokeWidth } = params;
    const lastValues = nbrDataPoints === 0 ? [] : values.slice(-nbrDataPoints);
    return (
      <div
        style={{
          border: '1px solid lightgray',
          padding: '0.25em',
          fontSize: 'small',
          width: `${expandToGrid(width)}px`,
          height: `${expandToGrid(height)}px`
        }}
      >
        <LineChart data={lastValues} width={width} height={height}>
          {liveMode && (
            <XAxis dataKey="time">
              <Label offset={-3} position="insideBottom" value="Δs" />
            </XAxis>
          )}
          <YAxis>
            {liveMode && <Label angle={-90} position="insideLeft" value={yAxisLabel} />}
          </YAxis>
          {liveMode && <Tooltip />}
          {showGrid && <CartesianGrid vertical={false} stroke="#eee" strokeDasharray="5 5" />}
          <Line
            dot={false}
            isAnimationActive={false}
            type="linear"
            dataKey="value"
            strokeWidth={strokeWidth}
            stroke="#ff7300"
            yAxisId={0}
          />
        </LineChart>
      </div>
    );
  }
}

AttributePlotter.propTypes = {
  mode: PropTypes.string,
  params: PropTypes.shape({
    height: PropTypes.number,
    nbrDataPoints: PropTypes.number,
    showGrid: PropTypes.bool,
    strokeWidth: PropTypes.number,
    width: PropTypes.number,
    yAxisLabel: PropTypes.string
  })
};

AttributePlotter.defaultProps = {
  mode: 'edit',
  params: {}
};
