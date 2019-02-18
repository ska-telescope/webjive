import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import Files from 'react-files';
import { widgetPropType } from '../../../propTypes/propTypes';
import { setModal, SAVE_CANVASES } from '../../../actions/modal';

export class SaveLoadCanvas extends Component {
  constructor(props) {
    super(props);
    this.handleSaveButtonClick = this.handleSaveButtonClick.bind(this);
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

  handleSaveButtonClick() {
    const { canvases, onSave } = this.props;
    onSave(JSON.stringify(canvases));
  }

  render() {
    return (
      <div className="btn-group">
        <Button
          id="save-button"
          type="button"
          className="btn btn-primary"
          onClick={this.handleSaveButtonClick}
        >
          <i className="fa fa-download" /> Save Layout
        </Button>
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
  onLoadFile: PropTypes.func.isRequired,
  canvases: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
      widgets: PropTypes.arrayOf(widgetPropType)
    })
  ),
  onSave: PropTypes.func
};

SaveLoadCanvas.defaultProps = {
  canvases: null,
  onSave: () => null
};

function mapDispatchToProps(dispatch) {
  return {
    onSave: canvases => dispatch(setModal(SAVE_CANVASES, canvases))
  };
}

export default connect(
  null,
  mapDispatchToProps
)(SaveLoadCanvas);
