import React, { Component } from 'react';
import PropTypes from 'prop-types';
import fileDownload from 'js-file-download';
import { Button, Modal } from 'react-bootstrap';
import { connect } from 'react-redux';
import * as actions from '../../actions/filename';

const getFilename = () => `webjive-layout-${new Date().getTime()}`;

export class SaveCanvases extends Component {
  constructor(props) {
    super(props);
    this.filenameInput = React.createRef();
    this.handleSaveClick = this.handleSaveClick.bind(this);
  }

  componentDidMount = () => {
    this.filenameInput.current.focus();
  };

  handleFilenameChange = () => {
    const { setFilename } = this.props;
    setFilename(this.filenameInput.current.value || this.filenameInput.current.placeholder);
  };

  handleSaveClick() {
    const { canvases, closeDialog, filename } = this.props;
    fileDownload(
      canvases,
      `${filename ||
        this.filenameInput.current.value ||
        this.filenameInput.current.placeholder}.json`,
      'application/json'
    );
    closeDialog();
  }

  render() {
    const { filename, closeDialog } = this.props;
    return (
      <Modal.Dialog>
        <Modal.Header>
          <Modal.Title>Save Canvases</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <input
            id="filename-input"
            ref={this.filenameInput}
            className="form-control"
            placeholder={filename || getFilename()}
            onChange={this.handleFilenameChange}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button id="cancel-button" className="btn btn-outline-danger" onClick={closeDialog}>
            Cancel
          </Button>
          <Button id="save-button" className="btn btn-primary" onClick={this.handleSaveClick}>
            Save
          </Button>
        </Modal.Footer>
      </Modal.Dialog>
    );
  }
}

SaveCanvases.propTypes = {
  canvases: PropTypes.string,
  closeDialog: PropTypes.func,
  filename: PropTypes.string,
  setFilename: PropTypes.func
};

SaveCanvases.defaultProps = {
  canvases: '',
  closeDialog: () => null,
  filename: '',
  setFilename: () => null
};

function mapStateToProps({ filename }) {
  return {
    filename
  };
}

function mapDispatchToProps(dispatch) {
  return {
    setFilename: filename => dispatch(actions.setFilename(filename))
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SaveCanvases);
