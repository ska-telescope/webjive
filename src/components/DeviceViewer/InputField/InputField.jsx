import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { command } from '../../../propTypes/propTypes';

class InputField extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleExecute = this.handleExecute.bind(this);
    this.state = {
      value: '',
      valid: this.props.intype === 'DevString' || this.props.intype === 'DevVoid'
    };
  }

  handleChange(event) {
    if (this.props.intype === 'DevBoolean' && event.target.value.length > 0) {
      this.setState({ value: event.target.value, valid: true });
    } else if (event.target.value.length > 0 && this.props.intype !== 'DevString') {
      if (this.props.intype.includes('U') && event.target.value >= 0) {
        this.setState({ value: parseInt(event.target.value, 10), valid: true });
      }
      if (
        (this.props.intype.includes('Long') || this.props.intype.includes('Short')) &&
        !this.props.intype.includes('U')
      ) {
        this.setState({ value: parseInt(event.target.value, 10), valid: true });
      } else if (!this.props.intype.includes('U')) {
        this.setState({ value: parseFloat(event.target.value, 10), valid: true });
      }
    } else if (this.props.intype === 'DevString') {
      this.setState({ value: event.target.value, valid: true });
    } else {
      this.setState({ value: '', valid: false });
    }
  }

  handleExecute(event) {
    event.preventDefault();
    if (this.props.intype === 'DevString') {
      this.props.onExecute(
        this.props.name,
        JSON.stringify(this.state.value),
        this.props.currentDeviceName
      );
    } else {
      this.props.onExecute(this.props.name, this.state.value, this.props.currentDeviceName);
    }
    this.setState({ value: '', valid: false });
  }

  render() {
    const disabled = !(this.state.valid && this.props.isEnabled);
    const intype = this.props.intype;
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
          value={this.state.value}
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
          value={this.state.value}
          onChange={this.handleChange}
          placeholder={intype}
        />
      );
    } else if (intype === 'DevString') {
      inner = (
        <input
          type="text"
          className="form-control"
          value={this.state.value}
          onChange={this.handleChange}
          placeholder={intype}
        />
      );
    } else {
      inner = (
        <input
          type="number"
          className="form-control"
          value={this.state.value}
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
  onExecute: PropTypes.func,
  currentDeviceName: PropTypes.string,
  commands: PropTypes.oneOfType([PropTypes.arrayOf(command), command]),
  name: PropTypes.string,
  intype: PropTypes.string
};

export default InputField;
