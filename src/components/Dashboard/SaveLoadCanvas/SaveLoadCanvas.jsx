import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { setModal, LOAD_CANVASES } from '../../../actions/modal';

export class SaveLoadCanvas extends Component {
  constructor(props) {
    super(props);
    this.handleLoadClick = this.handleLoadClick.bind(this);
  }

  handleLoadClick() {
    const { onLoad } = this.props;
    if (window.File && window.FileReader && window.FileList && window.Blob) {
      onLoad();
    } else {
      alert('The File APIs are not fully supported in this browser.');
    }
  }

  render() {
    return (
      <Fragment>
        <button
          id="load-button"
          type="button"
          className="btn btn-primary btn-sm"
          onClick={this.handleLoadClick}
        >
          Load Layout
        </button>
      </Fragment>
    );
  }
}

SaveLoadCanvas.propTypes = {
  onLoad: PropTypes.func
};

SaveLoadCanvas.defaultProps = {
  onLoad: () => null
};

function mapDispatchToProps(dispatch) {
  return {
    onLoad: () => dispatch(setModal(LOAD_CANVASES, null))
  };
}

export default connect(
  null,
  mapDispatchToProps
)(SaveLoadCanvas);
