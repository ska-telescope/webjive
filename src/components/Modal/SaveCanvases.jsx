import React, { Component } from 'react';
import PropTypes from 'prop-types';
import fileDownload from 'js-file-download';
import { Button, Modal } from 'react-bootstrap';

export default class SaveCanvases extends Component {
  handleSaveClick = () => {
    const { canvases, closeDialog } = this.props;
    fileDownload(canvases, 'webjive.json', 'application/json');
    closeDialog();
  };

  render() {
    const { closeDialog } = this.props;
    return (
      <Modal.Dialog>
        <Modal.Header>
          <Modal.Title>Save Canvases</Modal.Title>
        </Modal.Header>
        <Modal.Body>Test</Modal.Body>
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
