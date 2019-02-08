import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Modal } from 'react-bootstrap';

export default class LoadCanvases extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { closeDialog } = this.props;
    return (
      <Modal.Dialog>
        <Modal.Header>
          <Modal.Title>Load Canvases</Modal.Title>
        </Modal.Header>
        <Modal.Body>Load file</Modal.Body>
        <Modal.Footer>
          <Button id="load-button" className="btn btn-outline-secondary">
            Load
          </Button>
          <Button id="cancel-button" className="btn btn-outline-secondary" onClick={closeDialog}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal.Dialog>
    );
  }
}

LoadCanvases.propTypes = {
  closeDialog: PropTypes.func
};

LoadCanvases.defaultProps = {
  closeDialog: () => null
};
