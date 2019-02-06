import React, { Component, Fragment } from 'react';

export default class SaveLoadCanvas extends Component {
  constructor(props) {
    super(props);
    this.handleSaveButtonClick = this.handleSaveButtonClick.bind(this);
    this.handleLoadButtonClick = this.handleLoadButtonClick.bind(this);
  }

  handleSaveButtonClick() {
    console.log('SAVE!');
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
