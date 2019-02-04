import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { connect } from 'react-redux';

import ValueDisplay from './ValueDisplay/ValueDisplay';
import DescriptionDisplay from '../DescriptionDisplay/DescriptionDisplay';

import { setDeviceAttribute } from '../../../actions/tango';

import './AttributeTable.css';
import { getActiveDataFormat, getEnabledDisplevels } from '../../../selectors/deviceDetail';
import { getCurrentDeviceAttributes, getCurrentDeviceName } from '../../../selectors/currentDevice';
import { setDataFormat } from '../../../actions/deviceList';

/* eslint-disable jsx-a11y/anchor-is-valid */

const DataFormatChooser = ({ dataFormats, selected, onSelect }) => {
  const order = ['SCALAR', 'SPECTRUM', 'IMAGE'];
  const sortedFormats = dataFormats.slice().sort((f1, f2) => order.indexOf(f1) - order.indexOf(f2));

  return (
    <ul className="DataFormatChooser nav nav-pills">
      {sortedFormats.map(format => (
        <li className="nav-item" key={format}>
          <a
            className={classNames('nav-link', { active: format === selected })}
            href="#"
            onClick={e => {
              e.preventDefault();
              onSelect(format);
            }}
          >
            {format}
          </a>
        </li>
      ))}
    </ul>
  );
};

DataFormatChooser.propTypes = {
  dataFormats: PropTypes.arrayOf(PropTypes.string).isRequired,
  onSelect: PropTypes.func.isRequired,
  selected: PropTypes.string.isRequired
};

const QualityIndicator = ({ quality }) => {
  const sub =
    {
      ATTR_VALID: 'valid',
      ATTR_INVALID: 'invalid',
      ATTR_CHANGING: 'changing',
      ATTR_ALARM: 'alarm',
      ATTR_WARNING: 'warning'
    }[quality] || 'invalid';

  return (
    <span className={`QualityIndicator quality-${sub}`} title={quality}>
      ●{' '}
    </span>
  );
};

QualityIndicator.propTypes = {
  quality: PropTypes.string
};

QualityIndicator.defaultProps = {
  quality: ''
};

const AttributeTable = ({
  attributes,
  selectedFormat,
  deviceName,
  onSelectDataFormat,
  onSetDeviceAttribute,
  enabledList
}) => {
  const dataFormats = Array.from(new Set(attributes.map(attr => attr.dataformat)));
  const filteredAttributes = attributes.filter(
    attr =>
      attr.dataformat === selectedFormat && Object.values(enabledList).indexOf(attr.displevel) > -1
  );
  return (
    <div className="AttributeTable">
      <DataFormatChooser
        dataFormats={dataFormats}
        selected={selectedFormat}
        onSelect={onSelectDataFormat}
      />
      <table className="separated">
        <tbody>
          {filteredAttributes.map(
            ({
              name,
              value,
              quality,
              datatype,
              dataformat,
              description,
              writable,
              maxvalue,
              minvalue
            }) => (
              <tr key={`${name}${value}${datatype}`}>
                <td className="quality">
                  <QualityIndicator quality={quality} />
                </td>
                <td className="name">{name}</td>
                <td className="value">
                  <ValueDisplay
                    name={name}
                    deviceName={deviceName}
                    value={value}
                    datatype={datatype}
                    dataformat={dataformat}
                    writable={writable}
                    maxvalue={maxvalue}
                    minvalue={minvalue}
                    setDeviceAttribute={onSetDeviceAttribute}
                  />
                </td>
                <td className="description">
                  <DescriptionDisplay description={description} />
                </td>
              </tr>
            )
          )}
        </tbody>
      </table>
    </div>
  );
};

AttributeTable.propTypes = {
  attributes: PropTypes.arrayOf(
    PropTypes.shape({
      dataformat: PropTypes.string,
      datatype: PropTypes.string,
      description: PropTypes.string,
      displevel: PropTypes.string,
      maxvalue: PropTypes.any,
      minvalue: PropTypes.any,
      name: PropTypes.string,
      quality: PropTypes.string,
      value: PropTypes.any, // possibly PropTypes.oneOfType(...)
      writable: PropTypes.string
    })
  ).isRequired,
  deviceName: PropTypes.string,
  enabledList: PropTypes.arrayOf(PropTypes.string).isRequired,
  onSelectDataFormat: PropTypes.func.isRequired,
  onSetDeviceAttribute: PropTypes.func.isRequired,
  selectedFormat: PropTypes.string
};

AttributeTable.defaultProps = {
  deviceName: '',
  selectedFormat: ''
};

function mapStateToProps(state) {
  return {
    selectedFormat: getActiveDataFormat(state),
    attributes: getCurrentDeviceAttributes(state),
    deviceName: getCurrentDeviceName(state),
    enabledList: getEnabledDisplevels(state)
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onSelectDataFormat: format => dispatch(setDataFormat(format)),
    onSetDeviceAttribute: (device, name, value) => dispatch(setDeviceAttribute(device, name, value))
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AttributeTable);
