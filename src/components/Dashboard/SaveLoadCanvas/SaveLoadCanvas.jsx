import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { widgetPropType } from '../../../propTypes/propTypes';
import { SAVE_CANVASES, setModal } from '../../../actions/modal';

export class SaveLoadCanvas extends Component {
  constructor(props) {
    super(props);
    this.handleSaveButtonClick = this.handleSaveButtonClick.bind(this);
  }

  handleSaveButtonClick() {
    const { canvases, onSave } = this.props;
    onSave(JSON.stringify(canvases));
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
  onSave: PropTypes.func.isRequired
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
