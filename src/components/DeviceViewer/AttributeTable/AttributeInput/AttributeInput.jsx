import React from 'react';
import cx from 'classnames';
import './AttributeInput.css';
import PropTypes from 'prop-types';

const ENTER_KEY = 13;
const MOVING_BG = 3;
const READY = 2;
const ISSUE = 1;

export default class AttributeInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      edited: false,
      badEntry: false
    };
    this.handleKey = this.handleKey.bind(this);
    this.motorRef = React.createRef();
  }

  componentWillReceiveProps(nextProps) {
    const { decimalPoints, value } = this.props;
    if (nextProps.value !== value) {
      this.motorRef.current.value = nextProps.value.toFixed(decimalPoints);
      this.motorRef.current.defaultValue = nextProps.value.toFixed(decimalPoints);
      this.setState({ edited: false });
    }
  }

  handleKey(e) {
    e.preventDefault();
    e.stopPropagation();

    this.setState({ edited: true });
    const targetValue = e.target.valueAsNumber;
    const { decimalPoints, maxvalue, minvalue, save, state, value } = this.props;
    const { MOVING } = this.state;
    if (
      targetValue != null &&
      ((minvalue != null && minvalue > targetValue) || (maxvalue != null && targetValue > maxvalue))
    ) {
      this.setState({ badEntry: true });
    } else if (targetValue != null) {
      this.setState({ badEntry: false });
      if ([ENTER_KEY].includes(e.keyCode) && state === READY) {
        this.setState({ edited: false });
        save(e.target.valueAsNumber);
        this.motorRef.current.value = value.toFixed(decimalPoints);
      } else if (state === MOVING) {
        this.setState({ edited: false });
        this.motorRef.current.value = value.toFixed(decimalPoints);
      }
    }
  }

  render() {
    const { disabled, value, motorName, decimalPoints, state } = this.props;
    const { badEntry, edited } = this.state;
    const valueCropped = value.toFixed(decimalPoints);

    const inputCSS = cx('form-control rw-input', {
      'input-bg-edited': edited && !badEntry,
      'input-bg-moving': state === MOVING_BG,
      'input-bg-ready': state === READY,
      'input-bg-fault': state <= ISSUE || badEntry
    });

    return (
      <div className="AttributeInput motor-input-container">
        <form className="form-group" onSubmit={this.handleKey} noValidate>
          <div
            className="rw-widget rw-numberpicker rw-widget-no-right-border"
            style={{ width: '90px', display: 'inline-block' }}
          >
            <input
              ref={this.motorRef}
              className={inputCSS}
              onKeyUp={this.handleKey}
              type="number"
              defaultValue={valueCropped}
              name={motorName}
              disabled={state !== 2 || disabled}
            />
          </div>
        </form>
      </div>
    );
  }
}

AttributeInput.propTypes = {
  decimalPoints: PropTypes.string,
  disabled: PropTypes.bool,
  // eslint-disable-next-line react/forbid-prop-types
  maxvalue: PropTypes.any,
  // eslint-disable-next-line react/forbid-prop-types
  minvalue: PropTypes.any,
  motorName: PropTypes.string,
  save: PropTypes.func.isRequired,
  state: PropTypes.number,
  value: PropTypes.number
};

AttributeInput.defaultProps = {
  decimalPoints: '2',
  disabled: false,
  maxvalue: 100,
  minvalue: 0,
  motorName: '',
  state: 0,
  value: 0
};
