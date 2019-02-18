import React, { Component } from 'react';
import PropTypes from 'prop-types';
import MiniCanvas from './MiniCanvas';

/* eslint-disable react/prefer-stateless-function */
/* eslint-disable react/forbid-prop-types */

function complexWidgetComponent(canvas) {
  return class ComplexWidget extends Component {
    static propTypes = {
      device: PropTypes.string,
      attributes: PropTypes.any,
      mode: PropTypes.string
    };

    static defaultProps = {
      device: '',
      attributes: null,
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
