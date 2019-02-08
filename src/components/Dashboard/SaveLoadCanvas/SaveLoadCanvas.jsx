import React, { Component, Fragment } from 'react';
import { Button } from 'react-bootstrap';
import Files from 'react-files';

export default class SaveLoadCanvas extends Component {
  constructor(props) {
    super(props);
    this.onFilesChange = this.onFilesChange.bind(this);
  }

  onFilesChange(files) {
    console.log(files);
  }

  render() {
    return (
      <Fragment>
        <Files
          onChange={this.onFilesChange}
          accepts={['application/json']}
          maxFileSize={10000000}
          minFileSize={0}
          clickable
        >
          <Button className="btn btn-sm btn-primary">Load Layout</Button>
        </Files>
      </Fragment>
    );
  }
}
