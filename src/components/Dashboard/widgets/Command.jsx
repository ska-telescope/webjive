import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as tangoActions from '../../../actions/tango';

class SetAttributeButton extends Component {
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
      <button type="button" onClick={this.handleClick}>
        Set {device || 'device'} {attribute || 'attribute'} {params.value || null}
      </button>
    );
  }
}

SetAttributeButton.propTypes = {
  mode: PropTypes.string,
  device: PropTypes.string,
  attribute: PropTypes.string,
  params: PropTypes.shape({ value: PropTypes.number }),
  setDeviceAttribute: PropTypes.func.isRequired
};

SetAttributeButton.defaultProps = {
  mode: 'library',
  device: '',
  attribute: '',
  params: { value: 0 }
};

export default connect(
  null,
  tangoActions
)(SetAttributeButton);
