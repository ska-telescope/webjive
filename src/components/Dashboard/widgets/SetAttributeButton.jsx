import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as tangoActions from '../../../actions/tango';

export class SetAttributeButton extends Component {
  constructor() {
    super();
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    const { attribute, device, mode, params, setDeviceAttribute } = this.props;
    if (mode === 'run') {
      setDeviceAttribute(device, attribute, params.value);
    }
  }

  render() {
    const { device, attribute, params } = this.props;
    return (
      <button id="button" type="button" onClick={this.handleClick}>
        Set {device || 'device'} {attribute || 'attribute'}
        {params.value !== null ? ` ${params.value}` : null}
      </button>
    );
  }
}

SetAttributeButton.propTypes = {
  mode: PropTypes.string,
  device: PropTypes.string,
  attribute: PropTypes.string,
  params: PropTypes.shape({ value: PropTypes.number }),
  setDeviceAttribute: PropTypes.func
};

SetAttributeButton.defaultProps = {
  mode: 'library',
  device: '',
  attribute: '',
  params: { value: null },
  setDeviceAttribute: (device, attribute, value) => `${device} ${attribute} ${value}`
};

export default connect(
  null,
  tangoActions
)(SetAttributeButton);
