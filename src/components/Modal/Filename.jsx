import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Modal } from 'react-bootstrap';
import { connect } from 'react-redux';
import { setFilename } from '../../actions/filename';

const getFilename = () => `webjive-layout-${new Date().getTime()}`;

export class Filename extends Component {
  constructor(props) {
    super(props);
    this.filenameInput = React.createRef();
  }

  componentDidMount = () => {
    // this.filenameInput.focus();
  };

  handleSaveClick = () => {
    const { onSetFilename, closeDialog, filename } = this.props;
    onSetFilename(
      this.filenameInput.current.value || filename || this.filenameInput.current.placeholder
    );
    closeDialog();
  };

  render() {
    const { closeDialog, filename } = this.props;
    return (
      <Modal.Dialog>
        <Modal.Header>
          <Modal.Title>Enter Filename</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <input
            ref={this.filenameInput}
            className="form-control"
            placeholder={filename || getFilename()}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button className="btn btn-outline-primary" onClick={this.handleSaveClick}>
            Save
          </Button>
          <Button className="btn btn-outline-danger" onClick={closeDialog}>
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
