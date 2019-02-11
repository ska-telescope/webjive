import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';
import Files from 'react-files';

class SaveLoadCanvas extends Component {
  constructor(props) {
    super(props);
    this.onFilesChange = this.onFilesChange.bind(this);
    this.fileReader = null;
  }

  onFilesChange(files) {
    this.fileReader = new FileReader();
    this.fileReader.onloadend = this.handleFileRead;
    if (files) this.fileReader.readAsText(files.pop());
  }

  handleFileRead = () => {
    const { onLoadFile } = this.props;
    const content = this.fileReader.result;
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
          <Button id="load-button" className="btn btn-primary">
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

export default SaveLoadCanvas;
