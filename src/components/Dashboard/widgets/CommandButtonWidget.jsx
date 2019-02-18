import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as tangoActions from '../../../actions/tango';

export class CommandButtonWidget extends Component {
  constructor() {
    super();
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    const { command, device, mode, params, executeCommand } = this.props;
    if (mode === 'run') {
    executeCommand(command, params.value, device);
    const data = await client.request(FETCH_DEVICE_NAMES);
    return data.devices.map(device => device.name);
    }
  }

  render() {
    const { device, command, params } = this.props;
    
    return (
      <button className="btn btn-primary" type="button" onClick={this.handleClick}>
        Set {device || 'device'} {command|| 'command'}
        {params.value !== null ? ` ${params.value}` : null}
      </button>
    );
  }
}

CommandButtonWidget.propTypes = {
  mode: PropTypes.string,
  device: PropTypes.string,
  command: PropTypes.string,
  params: PropTypes.shape({value: PropTypes.string }),
  executeCommand: PropTypes.func
};

CommandButtonWidget.defaultProps = {
  mode: 'library',
  device: '',
  command: '',
  params: {value: null },
  executeCommand: (command, value, device)=> `${command} ${value} ${device}`

};

export default connect(
  null,
  tangoActions
)(CommandButtonWidget);
