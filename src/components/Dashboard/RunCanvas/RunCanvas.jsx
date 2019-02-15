import React, { Component } from 'react';
import PropTypes from 'prop-types';
import getWidgetDefinition from '../utils';
import { widgetPropType, widgetDefinitionPropType, subCanvas } from '../../../propTypes/propTypes';
import ErrorBoundary from './ErrorBoundary';

/* eslint-disable no-underscore-dangle */
/* eslint-disable react/no-array-index-key */

const modelsForSubcanvas = (canvas, parent) =>
  canvas.widgets
    .map(widget => {
      const deviceSource = widget.device === '__parent__' ? parent : widget;
      return [deviceSource.device, widget.attribute];
    })
    .filter(([device, attribute]) => device != null && attribute != null)
    .map(([device, attribute]) => `${device}/${attribute}`);

export default class RunCanvas extends Component {
  constructor(props) {
    super(props);
    this.state = {
      attributes: {}
    };
  }

  componentDidMount() {
    this.connect();
  }

  componentWillUnmount() {
    this.socket.close();
  }

  isSubcanvasWidget(widget) {
    return this.definitionForWidget(widget).__canvas__ != null;
  }

  connect() {
    const { subCanvases, widgets } = this.props;
    const canvasModels = widgets
      .filter(widget => widget.device != null)
      .filter(widget => this.isSubcanvasWidget(widget))
      .map(widget => {
        const canvasIndex = this.definitionForWidget(widget).__canvas__;
        const canvas = subCanvases[canvasIndex];
        return modelsForSubcanvas(canvas, widget);
      })
      .reduce((accum, curr) => [...accum, ...curr], []);

    const widgetModels = widgets
      .filter(({ canvas }) => canvas == null)
      .filter(({ device, attribute }) => device != null && attribute != null) // Skip widgets without device -- revise this
      .map(({ device, attribute }) => `${device}/${attribute}`);

    const models = [...canvasModels, ...widgetModels].filter(
      // Unique
      (val, idx, arr) => arr.indexOf(val) === idx
    );

    function socketUrl() {
      const loc = window.location;
      const protocol = loc.protocol.replace('http', 'ws');
      return `${protocol}//${loc.host}/socket`;
    }

    this.socket = new WebSocket(`${socketUrl()}?dashboard`, 'graphql-ws');

    const query = `
          subscription newChangeEvent($models: [String]!) {
            changeEvent(models: $models) {
              eventType
              device
              name
              data {
                value
                time
              }
            }
          }`;
    const variables = { models };
    const payload = { query, variables };

    this.socket.addEventListener('message', msg => {
      const data = JSON.parse(msg.data);
      if (data.type === 'data') {
        const { changeEvent } = data.payload.data;
        if (changeEvent == null) {
          return;
        }

        const updatedAttributes = changeEvent.reduce((accum, event) => {
          const { value, time } = event.data;
          const model = `${event.device}/${event.name}`;
          return {
            ...accum,
            [model]: {
              value,
              time
            }
          };
        }, {});

        let { attributes } = this.state;
        attributes = { ...attributes, ...updatedAttributes };
        this.setState({ attributes });
      }
    });

    this.socket.addEventListener('open', () => {
      const request = JSON.stringify({ type: 'start', payload });
      this.socket.send(request);
    });
  }

  definitionForWidget(widget) {
    const { widgetDefinitions } = this.props;
    return getWidgetDefinition(widgetDefinitions, widget.type);
  }

  entryForModel(device, attribute) {
    const { attributes } = this.state;
    const model = `${device}/${attribute}`;
    return attributes[model] || {};
  }

  valueForModel(device, attribute) {
    return this.entryForModel(device, attribute).value;
  }

  timeForModel(device, attribute) {
    const { time } = this.entryForModel(device, attribute);
    return new Date(time);
  }

  render() {
    const { widgets } = this.props;
    const { attributes } = this.state;
    return (
      <div className="Canvas run">
        {widgets.map((widget, i) => {
          const definition = this.definitionForWidget(widget);
          const Widget = definition.component;
          const { x, y, device, attribute, command, params } = widget;
          const value = this.valueForModel(device, attribute);
          const time = this.timeForModel(device, attribute);

          const extraProps = definition.__canvas__ != null ? { attributes } : {};

          return (
            <div key={i} className="Widget" style={{ left: x, top: y }}>
              <ErrorBoundary>
                <Widget
                  mode="run"
                  device={device}
                  attribute={attribute}
                  command={command}
                  value={value}
                  time={time}
                  params={params}
                  {...extraProps}
                />
              </ErrorBoundary>
            </div>
          );
        })}
      </div>
    );
  }
}

RunCanvas.propTypes = {
  subCanvases: PropTypes.arrayOf(subCanvas),
  widgetDefinitions: PropTypes.arrayOf(widgetDefinitionPropType),
  widgets: PropTypes.arrayOf(widgetPropType)
};

RunCanvas.defaultProps = {
  subCanvases: [],
  widgetDefinitions: [],
  widgets: []
};
