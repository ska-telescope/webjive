import React, { Component } from 'react';
import PropTypes from 'prop-types';
import fileDownload from 'js-file-download';
import { Button, Modal } from 'react-bootstrap';
import { connect } from 'react-redux';
import * as actions from '../../actions/filename';

const getFilename = () => `webjive-layout-${new Date().getTime()}`;

class SaveCanvases extends Component {
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
    const { setFilename } = this.props;
    setFilename(this.filenameInput.current.value || this.filenameInput.current.placeholder);
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
  canvases: PropTypes.string.isRequired,
  setFilename: PropTypes.func.isRequired
};

function mapStateToProps({ filename }) {
  return {
    filename
  };
}

export default connect(
  mapStateToProps,
  actions
)(SaveCanvases);
