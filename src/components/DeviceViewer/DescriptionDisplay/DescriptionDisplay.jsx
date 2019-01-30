import React from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';
import './DescriptionDisplay.css';

const DescriptionDisplay = ({ description }) => (
  <i
    role="button"
    tabIndex="0"
    className={cx('DescriptionDisplay fa fa-info-circle', {
      'no-description': description === 'No description'
    })}
    title={description}
    onClick={alert.bind(null, description)}
    onKeyPress={alert.bind(null, description)}
  />
);

DescriptionDisplay.propTypes = {
  description: PropTypes.string
};

DescriptionDisplay.defaultProps = {
  description: ''
};

export default DescriptionDisplay;
