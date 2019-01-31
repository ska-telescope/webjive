import React from 'react';
import PropTypes from 'prop-types';
import Plot from 'react-plotly.js';
import { expandToGrid } from '../Dashboard';

const trace1 = {
  x: [1, 2, 3, 4, 5],
  y: [16, 5, 11, 9, 11],
  mode: 'lines'
};
const plotterSampleValues = trace1;

export default class AttributeTrend extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: { x: [], y: [] }
    };
  }

  componentWillReceiveProps(newProps) {
    const { mode } = this.props;
    let { data } = this.state;
    if (mode === 'edit' || mode === 'library') {
      return;
    }
    const oldValues = data.y;
    const oldTimes = data.x;
    const newValue = newProps.value;
    // Difference in seconds between "now" and when the plot was created, rounded to one decimal place.
    const newTime = newProps.time;
    data = {
      y: [...oldValues, newValue],
      x: [...oldTimes, newTime]
    };
    this.setState({ data });
  }

  render() {
    const { mode, params } = this.props;
    let { data } = this.state;
    const liveMode = mode !== 'edit' && mode !== 'library';
    data = liveMode ? data : plotterSampleValues;

    const { nbrDataPoints, width, height, showGrid, Title } = params;
    const lastValues = nbrDataPoints === 0 ? [] : data.y.slice(-nbrDataPoints);
    const lastTimes = nbrDataPoints === 0 ? [] : data.x.slice(-nbrDataPoints);

    const data0 = [trace1];
    const trace = [
      {
        x: lastTimes,
        y: lastValues,
        mode: 'lines'
      }
    ];
    const layout = {
      width,
      height: height - 10,
      title: Title,
      xaxis: { showgrid: showGrid },
      yaxis: { showgrid: showGrid }
    };

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
        <Plot data={liveMode ? trace : data0} layout={layout} />
      </div>
    );
  }
}

AttributeTrend.propTypes = {
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

AttributeTrend.defaultProps = {
  mode: 'edit',
  params: {}
};
