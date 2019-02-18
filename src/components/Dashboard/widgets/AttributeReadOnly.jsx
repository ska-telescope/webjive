import React from 'react';
import PropTypes from 'prop-types';

const AttributeReadOnly = ({
  device,
  attribute,
  mode,
  value,
  params: { scientific, showDevice, showAttribute }
}) => {
  let displayValue;
  if (value == null) {
    displayValue = '-';
  } else if (scientific) {
    displayValue = Number(value).toExponential(2);
  } else {
    displayValue = value;
  }

  // Ugly logic to deal with all combinations of options and device/attribute presence
  // This might be simply an unnecessary feature, so don't spend time on improving it yet

  const deviceLabel = device || <i>device</i>;
  const attributeLabel = attribute || <i>attribute</i>;
  const labels = (showDevice ? [deviceLabel] : []).concat(showAttribute ? [attributeLabel] : []);
  let label;
  if (labels.length === 2) {
    label = (
      <span>
        {deviceLabel}/{attributeLabel}
      </span>
    );
  } else if (labels.length === 1) {
    [label] = labels;
  } else {
    label = null;
  }

  return (
    <div style={{ backgroundColor: '#eee', padding: '0.5em' }}>
      {label}
      {showDevice || showAttribute ? ': ' : ''}
      {mode === 'library' || mode === 'edit' ? <i>value</i> : displayValue}
    </div>
  );
};

AttributeReadOnly.propTypes = {
  attribute: PropTypes.string,
  device: PropTypes.string,
  mode: PropTypes.string,
  params: PropTypes.shape({
    scientific: PropTypes.bool,
    showAttribute: PropTypes.bool,
    showDevice: PropTypes.bool
  }),
  value: PropTypes.node
};

AttributeReadOnly.defaultProps = {
  device: '',
  attribute: '',
  mode: 'edit',
  params: {},
  value: null
};

export default AttributeReadOnly;
