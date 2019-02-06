import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { widgetPropType } from '../../../propTypes/propTypes';

export default class SaveLoadCanvas extends Component {
  constructor(props) {
    super(props);
    this.handleSaveButtonClick = this.handleSaveButtonClick.bind(this);
    this.handleLoadButtonClick = this.handleLoadButtonClick.bind(this);
  }

  handleSaveButtonClick() {
    const { canvases } = this.props;
    console.log(canvases);
  }

  handleLoadButtonClick() {
    console.log('LOAD!');
  }

  render() {
    return (
      <Fragment>
        <button
          type="button"
          className="btn btn-primary btn-sm"
          onClick={this.handleSaveButtonClick}
        >
          Save Layout
        </button>
        <button
          type="button"
          className="btn btn-warning btn-sm"
          onClick={this.handleLoadButtonClick}
        >
          Load Layout
        </button>
      </Fragment>
    );
  }
}

SaveLoadCanvas.propTypes = {
  canvases: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
      widgets: PropTypes.arrayOf(widgetPropType)
    })
  ).isRequired
};
