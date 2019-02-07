import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Modal } from 'react-bootstrap';
import { connect } from 'react-redux';
import { setFilename } from '../../actions/filename';

export class Filename extends Component {
  constructor(props) {
    super(props);
    this.handleSaveClick = this.handleSaveClick.bind(this);
  }

  handleSaveClick() {
    const { onSetFilename, closeDialog } = this.props;
    onSetFilename('NEW FILENAME');
    closeDialog();
  }

  render() {
    const { closeDialog, filename } = this.props;
    return (
      <Modal.Dialog>
        <Modal.Header>
          <Modal.Title>Enter Filename</Modal.Title>
        </Modal.Header>
        <Modal.Body>{filename}</Modal.Body>
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

Filename.propTypes = {
  filename: PropTypes.string.isRequired,
  closeDialog: PropTypes.func.isRequired,
  onSetFilename: PropTypes.func.isRequired
};

function mapStateToProps({ filename }) {
  return {
    filename
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onSetFilename: filename => dispatch(setFilename(filename))
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Filename);
