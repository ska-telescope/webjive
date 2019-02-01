import React, { Component } from 'react';
import PropTypes from 'prop-types';

function randomNumber(limit) {
  return Math.floor(Math.random() * limit);
}

const recorderSampleValues = Array(100)
  .fill(0)
  .map((_, i) => ({
    h: randomNumber(24),
    m: randomNumber(60),
    s: randomNumber(60),
    value: i
  }));

const padZero = num => {
  const s = String(num);
  return (s.length === 1 ? '0' : '') + s;
};

export default class AttributeRecorder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      values: []
    };
  }

  componentWillReceiveProps(newProps) {
    const { mode } = this.props;
    let { values } = this.state;
    if (mode === 'edit' || mode === 'library') {
      return;
    }

    const oldValues = values;
    const newValue = newProps.value;
    if (oldValues.length === 0 || newValue !== oldValues.slice(-1)[0].value) {
      const now = new Date();
      values = [
        ...oldValues,
        {
          value: newValue,
          h: now.getHours(),
          m: now.getMinutes(),
          s: now.getSeconds()
        }
      ];
      this.setState({ values });
    }
  }

  render() {
    const {
      mode,
      params: { numShow }
    } = this.props;
    let { values } = this.state;
    values = mode === 'edit' || mode === 'library' ? recorderSampleValues : values;
    const lastValues = numShow === 0 ? [] : values.slice(-numShow);

    return (
      <div
        style={{
          border: '1px solid lightgray',
          padding: '0.25em',
          fontSize: 'small'
        }}
      >
        <table style={{ tableLayout: 'fixed' }}>
          <thead>
            <tr>
              <th>Time</th>
              <th>Value</th>
            </tr>
          </thead>
          <tbody>
            {lastValues.map(({ h, m, s, value }) => (
              <tr key={`${h}${m}${s}${value}`}>
                <td style={{ paddingRight: '0.5em' }}>
                  {padZero(h)}:{padZero(m)}:{padZero(s)}
                </td>
                <td>{value}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {values.length === 0 && <div>No values recorded.</div>}
      </div>
    );
  }
}

AttributeRecorder.propTypes = {
  mode: PropTypes.string,
  params: PropTypes.shape({ numShow: PropTypes.number })
};

AttributeRecorder.defaultProps = {
  mode: 'edit',
  params: { numShow: 0 }
};
