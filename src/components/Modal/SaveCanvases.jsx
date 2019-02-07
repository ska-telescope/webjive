import React, { Component } from 'react';
import PropTypes from 'prop-types';
import fileDownload from 'js-file-download';
import { Button, Modal } from 'react-bootstrap';

const getFilename = () => `webjive-layout-${new Date().getTime()}`;

export default class SaveCanvases extends Component {
  constructor(props) {
    super(props);
    this.filenameInput = React.createRef();
    this.state = {
      filename: getFilename()
    };
  }

  componentDidMount = () => {
    this.filenameInput.current.focus();
  };

  handleFilenameChange = () => {
    this.setState({ filename: this.filenameInput.current.value });
  };

  handleSaveClick = () => {
    const { canvases, closeDialog } = this.props;
    const { filename } = this.state;
    fileDownload(canvases, `${filename}.json`, 'application/json');
    closeDialog();
  };

  render() {
    const { closeDialog } = this.props;
    const { filename } = this.state;
    return (
      <Modal.Dialog>
        <Modal.Header>
          <Modal.Title>Save Canvases</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <input
            ref={this.filenameInput}
            className="form-control"
            placeholder={filename}
            onChange={this.handleFilenameChange}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button className="btn btn-outline-secondary" onClick={this.handleSaveClick}>
            Save
          </Button>
          <Button className="btn btn-outline-secondary" onClick={closeDialog}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal.Dialog>
    );
  }
}

SaveCanvases.propTypes = {
  closeDialog: PropTypes.func.isRequired,
  canvases: PropTypes.string.isRequired
};
