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
    executeCommand(params.cmd, params.value, device);
    }
  }

  render() {
    const { device, command, params } = this.props;
    console.log('COMMAND' + command);
    console.log('Device' + device);
    return (
      <button className="btn btn-primary" type="button" onClick={this.handleClick}>
        Set {device || 'device'} {params.cmd || 'command'}
        {params.value !== null ? ` ${params.value}` : null}
      </button>
    );
  }
}

CommandButtonWidget.propTypes = {
  mode: PropTypes.string,
  device: PropTypes.string,
  command: PropTypes.string,
  params: PropTypes.shape({ cmd: PropTypes.string,  value: PropTypes.string }),
  executeCommand: PropTypes.func
};

CommandButtonWidget.defaultProps = {
  mode: 'library',
  device: '',
  command: '',
  params: {cmd:null, value: null },
//  executeCommand: (command, value, device)=> `${command} ${value} ${device}`
  executeCommand: (cmd, value, device)=> `${cmd} ${value} ${device}`

};

export default connect(
  null,
  tangoActions
)(CommandButtonWidget);
