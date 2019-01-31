import React, { Component } from 'react';
import PropTypes from 'prop-types';

class InputField extends Component {
  constructor(props) {
    super(props);
    const { intype } = this.props;
    this.state = {
      value: '',
      valid: intype === 'DevString' || intype === 'DevVoid'
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleExecute = this.handleExecute.bind(this);
  }

  handleChange(event) {
    const { intype } = this.props;
    const { value } = event.target;
    if (intype === 'DevBoolean' && value.length > 0) {
      this.setState({ value, valid: true });
    } else if (value.length > 0 && intype !== 'DevString') {
      if (intype.includes('U') && value >= 0) {
        this.setState({ value: parseInt(value, 10), valid: true });
      }
      if ((intype.includes('Long') || intype.includes('Short')) && !intype.includes('U')) {
        this.setState({ value: parseInt(value, 10), valid: true });
      } else if (!intype.includes('U')) {
        this.setState({ value: parseFloat(value, 10), valid: true });
      }
    } else if (intype === 'DevString') {
      this.setState({ value, valid: true });
    } else {
      this.setState({ value: '', valid: false });
    }
  }

  handleExecute(event) {
    const { currentDeviceName, intype, name, onExecute } = this.props;
    const { value } = this.state;
    event.preventDefault();
    if (intype === 'DevString') {
      onExecute(name, JSON.stringify(value), currentDeviceName);
    } else {
      onExecute(name, value, currentDeviceName);
    }
    this.setState({ value: '', valid: false });
  }

  render() {
    const { intype } = this.props;
    const { value, valid, isEnabled } = this.state;
    const disabled = !(valid && isEnabled);
    let inner = null;

    if (intype === 'DevVoid') {
      return (
        <button
          className="btn btn-outline-secondary"
          type="button"
          disabled={disabled}
          onClick={this.handleExecute}
        >
          Execute
        </button>
      );
    }

    if (intype === 'DevBoolean') {
      inner = (
        <select
          className="custom-select"
          id="inputGroupSelect04"
          value={value}
          onChange={this.handleChange}
        >
          <option value="" defaultValue disabled hidden>
            Choose...
          </option>
          <option value="true">True</option>
          <option value="false">False</option>
        </select>
      );
    } else if (intype.includes('U')) {
      inner = (
        <input
          type="number"
          min="0"
          className="form-control"
          value={value}
          onChange={this.handleChange}
          placeholder={intype}
        />
      );
    } else if (intype === 'DevString') {
      inner = (
        <input
          type="text"
          className="form-control"
          value={value}
          onChange={this.handleChange}
          placeholder={intype}
        />
      );
    } else {
      inner = (
        <input
          type="number"
          className="form-control"
          value={value}
          onChange={this.handleChange}
          placeholder={intype}
        />
      );
    }

    return (
      <div className="input-group">
        {inner}
        <div className="input-group-append">
          <button
            className="btn btn-outline-secondary"
            type="button"
            disabled={disabled}
            onClick={this.handleExecute}
          >
            Execute
          </button>
        </div>
      </div>
    );
  }
}

InputField.propTypes = {
  onExecute: PropTypes.func.isRequired,
  currentDeviceName: PropTypes.string,
  name: PropTypes.string,
  intype: PropTypes.string
};

InputField.defaultProps = {
  currentDeviceName: '',
  name: '',
  intype: ''
};

export default InputField;
