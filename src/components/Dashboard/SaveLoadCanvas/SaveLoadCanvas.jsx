import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';
import Files from 'react-files';

let fileReader;

export default class SaveLoadCanvas extends Component {
  constructor(props) {
    super(props);
    this.onFilesChange = this.onFilesChange.bind(this);
  }

  onFilesChange(files) {
    fileReader = new FileReader();
    fileReader.onloadend = this.handleFileRead;
    fileReader.readAsText(files[0]);
  }

  handleFileRead = () => {
    const { onLoadFile } = this.props;
    const content = fileReader.result;
    onLoadFile(JSON.parse(content));
  };

  render() {
    return (
      <div className="btn-group">
        <Files
          onChange={this.onFilesChange}
          accepts={['application/json']}
          maxFileSize={10000000}
          minFileSize={0}
          clickable
        >
          <Button className="btn btn-primary">
            <i className="fa fa-upload" /> Load Layout
          </Button>
        </Files>
      </div>
    );
  }
}

SaveLoadCanvas.propTypes = {
  onLoadFile: PropTypes.func.isRequired
};
