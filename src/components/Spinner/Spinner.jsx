import React from 'react';
import PropTypes from 'prop-types';
import './Spinner.css';

const Spinner = ({ size }) => {
  const style = {
    borderWidth: `${0.8 * (size * 0.23)}em`,
    width: `${size}em`,
    height: `${size}em`
  };
  return <div className="spinner" style={style} />;
};

Spinner.propTypes = {
  size: PropTypes.number.isRequired
};

export default Spinner;
