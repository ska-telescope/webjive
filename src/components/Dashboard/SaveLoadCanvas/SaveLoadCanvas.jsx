import React, { Component, Fragment } from 'react';

export default class SaveLoadCanvas extends Component {
  constructor(props) {
    super(props);
    this.handleLoadClick = this.handleLoadClick.bind(this);
  }

  handleLoadClick() {
    if (window.File && window.FileReader && window.FileList && window.Blob) {
      alert('You can load files');
    } else {
      alert('The File APIs are not fully supported in this browser.');
    }
  }

  render() {
    return (
      <Fragment>
        <button
          id="load-button"
          type="button"
          className="btn btn-primary btn-sm"
          onClick={this.handleLoadClick}
        >
          Load Layout
        </button>
      </Fragment>
    );
  }
}
