import React, { Component } from 'react';
import PropTypes from 'prop-types';
import MiniCanvas from './MiniCanvas';

/* eslint-disable react/prefer-stateless-function */

function complexWidgetComponent(canvas) {
  return class ComplexWidget extends Component {
    static propTypes = {
      device: PropTypes.string,
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
      mode: PropTypes.string
    };

    static defaultProps = {
      device: '',
      mode: 'edit'
    };

    render() {
      const { device, attributes, mode } = this.props;
      return (
        <MiniCanvas device={device} widgets={canvas.widgets} attributes={attributes} mode={mode} />
      );
    }
  };
}

export default function complexWidgetDefinition(canvas) {
  const { id, name } = canvas;
  return {
    type: `CANVAS_${id}`,
    name,
    component: complexWidgetComponent(canvas),
    fields: ['device'],
    params: [],
    __canvas__: id
  };
}
