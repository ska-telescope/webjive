import React from 'react';
import PropTypes from 'prop-types';

const DeviceName = ({ device, mode }) => {
  if (mode === 'library' || device == null) {
    return <i>Device Name</i>;
  }

  if (device === '__parent__') {
    return <i>Parent Device</i>;
  }

  return <span>{device}</span>;
};

DeviceName.propTypes = {
  device: PropTypes.string,
  mode: PropTypes.string
};

DeviceName.defaultProps = { device: '', mode: 'edit' };

export default DeviceName;
