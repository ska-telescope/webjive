import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import fileDownload from 'js-file-download';
import { connect } from 'react-redux';
import { widgetPropType } from '../../../propTypes/propTypes';
import { setModal } from '../../../actions/modal';

export class SaveLoadCanvas extends Component {
  constructor(props) {
    super(props);
    this.handleSaveButtonClick = this.handleSaveButtonClick.bind(this);
  }

  handleLoadButtonClick = () => {
    console.log('LOAD!');
  };

  async handleSaveButtonClick() {
    const { canvases, onSave, filename } = this.props;
    await onSave();
    const data = JSON.stringify(canvases);
    console.log(filename);
    // fileDownload(data, getFileName(), 'application/json');
  }

  render() {
    return (
      <Fragment>
        <button
          type="button"
          className="btn btn-primary btn-sm"
          onClick={this.handleSaveButtonClick}
        >
          Save Layout
        </button>
        <button
          type="button"
          className="btn btn-warning btn-sm"
          onClick={this.handleLoadButtonClick}
        >
          Load Layout
        </button>
      </Fragment>
    );
  }
}

SaveLoadCanvas.propTypes = {
  canvases: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
      widgets: PropTypes.arrayOf(widgetPropType)
    })
  ).isRequired,
  onSave: PropTypes.func.isRequired,
  filename: PropTypes.string
};

function mapStateToProps({ filename }) {
  return {
    filename
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onSave: () => dispatch(setModal('FILENAME'))
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SaveLoadCanvas);
