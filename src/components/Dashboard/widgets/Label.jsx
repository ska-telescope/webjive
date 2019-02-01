import React from 'react';
import PropTypes from 'prop-types';

const Label = ({ mode, params: { text } }) => (
  <div
    style={{
      border: mode === 'edit' ? '1px dashed gray' : '',
      padding: '0.5em'
    }}
  >
    {text || (mode === 'edit' || mode === 'library' ? <i>Your Text Here</i> : null)}
  </div>
);

Label.propTypes = {
  mode: PropTypes.string,
  params: PropTypes.shape({ text: PropTypes.string })
};

Label.defaultProps = {
  mode: 'edit',
  params: { text: 'label' }
};

export default Label;
