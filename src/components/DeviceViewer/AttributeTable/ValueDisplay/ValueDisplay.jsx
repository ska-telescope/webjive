import React from 'react';
import PropTypes from 'prop-types';
import { LineChart, Line, CartesianGrid, Tooltip, YAxis } from 'recharts';
import AttributeInput from '../AttributeInput/AttributeInput';
import './ValueDisplay.css';

/* eslint-disable react/no-array-index-key */
/* eslint-disable react/jsx-no-bind */
/* eslint-disable react/forbid-prop-types */

const DevStringValueDisplay = ({ value }) => {
  const values = [].concat(value);

  // Heuristic to check whether value is meant to be read in preformatted monospace
  // Example attribute: `Status' of `lab/adlinkiods/ao'
  const indicators = /(\n {2})|\t|( {4})/;
  const pre = values.find(val => val.match(indicators));

  return values.map((val, i) => (
    <p className={pre ? 'pre' : ''} key={i}>
      {val}
    </p>
  ));
};

DevStringValueDisplay.propTypes = {
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)])
};

const ScalarValueDisplay = ({
  value,
  datatype,
  name,
  deviceName,
  writable,
  setDeviceAttribute,
  minvalue,
  maxvalue
}) => {
  if (datatype === 'DevString') {
    return <DevStringValueDisplay value={value} />;
  }
  if (datatype === 'DevEncoded') {
    const [type, payload] = value;
    if (type !== 'json') {
      return `Unsupported encoding '${type}'`;
    }

    const json = JSON.stringify(JSON.parse(payload), 4);
    const lines = json.split('\n');
    return <DevStringValueDisplay value={lines} />;
  }
  if (
    writable === 'WRITE' ||
    (writable === 'READ_WITH_WRITE' && datatype === 'DevDouble') ||
    datatype === 'DevShort' ||
    datatype === 'DevFloat' ||
    datatype === 'DevLong' ||
    datatype === 'DevULong' ||
    datatype === 'DevULong64' ||
    datatype === 'DevUShort' ||
    datatype === 'DevLong64' ||
    datatype === 'DevUChar'
  ) {
    return (
      <AttributeInput
        save={setDeviceAttribute.bind(this, deviceName, name)}
        value={Number(value)}
        motorName={name}
        decimalPoints="2"
        state={2}
        disabled={false}
        maxvalue={maxvalue}
        minvalue={minvalue}
      />
    );
  }
  return value;
};
ScalarValueDisplay.propTypes = {
  datatype: PropTypes.string,
  deviceName: PropTypes.string,
  maxvalue: PropTypes.any,
  minvalue: PropTypes.any,
  name: PropTypes.string,
  setDeviceAttribute: PropTypes.func,
  value: PropTypes.any,
  writable: PropTypes.string
};

const SpectrumValueDisplay = ({ value, datatype }) => {
  if (datatype === 'DevString') {
    return <DevStringValueDisplay value={value} />;
  }

  const values = datatype === 'DevBoolean' ? value.map(val => (val ? 1 : 0)) : value;
  // eslint-disable-next-line no-shadow
  const data = values.map(value => ({ value }));
  const lineType = datatype === 'DevBoolean' ? 'step' : 'linear';

  return (
    <LineChart data={data} width={400} height={300}>
      <YAxis />
      <Tooltip />
      <CartesianGrid stroke="#f5f5f5" />
      <Line
        dot={false}
        isAnimationActive={false}
        type={lineType}
        dataKey="value"
        stroke="#ff7300"
        yAxisId={0}
      />
    </LineChart>
  );
};

SpectrumValueDisplay.propTypes = {
  value: PropTypes.any,
  datatype: PropTypes.string
};

SpectrumValueDisplay.defaultProps = {
  value: null,
  datatype: ''
};

class ImageValueDisplay extends React.Component {
  componentDidMount() {
    this.updateCanvas();
  }

  getIndicesForCoord(x, y) {
    const index = y * this.imageWidth() * 4 + x * 4;
    return index;
  }

  imageWidth() {
    const { value } = this.props;
    return value[0].length;
  }

  imageHeight() {
    const { value } = this.props;
    return value.length;
  }

  imageMax() {
    const { value } = this.props;
    const max = arr => arr.reduce((a, b) => Math.max(a, b));
    const maxes = value.map(max);
    return max(maxes);
  }

  updateCanvas() {
    const { name, value } = this.props;
    const canvas = document.getElementById(name);
    const context = canvas.getContext('2d');

    const image = value;
    const imgWidth = this.imageWidth();
    const imgHeight = this.imageHeight();

    const imgData = context.createImageData(imgWidth, imgHeight);
    canvas.width = imgWidth;
    canvas.height = imgHeight;

    const max = this.imageMax();

    image.forEach((outerArray, y) => {
      outerArray.forEach((v, x) => {
        const index = this.getIndicesForCoord(x, y, imgData.width);
        const normal = 255 * (v / (max === 0 ? 1 : max));
        imgData.data[index + 0] = normal;
        imgData.data[index + 1] = normal;
        imgData.data[index + 2] = normal;
        imgData.data[index + 3] = 255;
      });
    });

    context.putImageData(imgData, 0, 0);
  }

  render() {
    const { name } = this.props;
    if (document.getElementById(name)) {
      this.updateCanvas();
    }
    return <canvas id={name} />;
  }
}

ImageValueDisplay.propTypes = {
  name: PropTypes.string,
  value: PropTypes.any
};

ImageValueDisplay.defaultProps = {
  name: null,
  value: null
};

const ValueDisplay = ({
  value,
  deviceName,
  writable,
  setDeviceAttribute,
  datatype,
  dataformat,
  name,
  minvalue,
  maxvalue
}) => {
  if (value === null) {
    return <span className="ValueDisplay no-value">No value</span>;
  }

  const InnerDisplay = {
    IMAGE: ImageValueDisplay,
    SCALAR: ScalarValueDisplay,
    SPECTRUM: SpectrumValueDisplay
  }[dataformat];

  const className = ['ValueDisplay', dataformat.toLowerCase(), datatype].join(' ');

  return (
    <div className={className}>
      <InnerDisplay
        value={value}
        datatype={datatype}
        name={name}
        deviceName={deviceName}
        writable={writable}
        maxvalue={maxvalue}
        minvalue={minvalue}
        setDeviceAttribute={setDeviceAttribute}
      />
    </div>
  );
};

ValueDisplay.propTypes = {
  dataformat: PropTypes.string,
  datatype: PropTypes.string,
  deviceName: PropTypes.string,
  maxvalue: PropTypes.any,
  minvalue: PropTypes.any,
  name: PropTypes.string,
  setDeviceAttribute: PropTypes.func.isRequired,
  value: PropTypes.any,
  writable: PropTypes.string
};

ValueDisplay.defaultProps = {
  dataformat: '',
  datatype: '',
  deviceName: '',
  maxvalue: null,
  minvalue: null,
  name: '',
  value: null,
  writable: ''
};

export default ValueDisplay;
