import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { DragSource } from 'react-dnd';

const WarningBadge = () => (
  <div
    style={{
      position: 'absolute',
      marginLeft: '-10px',
      marginTop: '-10px',
      backgroundColor: 'red',
      borderRadius: '10px',
      width: '20px',
      height: '20px',
      color: 'white',
      textAlign: 'center',
      zIndex: 1000
    }}
  >
    <span className="fa fa-exclamation" />
  </div>
);

class EditWidget extends Component {
  render() {
    const {
      children,
      connectDragSource,
      onClick,
      isDragging,
      isSelected,
      warning,
      x,
      y
    } = this.props;
    if (isDragging) {
      return null;
    }
    return connectDragSource(
      <div
        className={isSelected ? 'Widget selected' : 'Widget'}
        style={{ left: x, top: y }}
        onClick={onClick}
        onKeyPress={onClick}
        role="button"
        tabIndex="0"
      >
        {warning && <WarningBadge />}
        {children}
      </div>
    );
  }
}

EditWidget.propTypes = {
  children: PropTypes.node.isRequired,
  connectDragSource: PropTypes.func.isRequired,
  isSelected: PropTypes.bool,
  isDragging: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
  warning: PropTypes.bool,
  x: PropTypes.number,
  y: PropTypes.number
};

EditWidget.defaultProps = {
  isSelected: false,
  isDragging: false,
  warning: false,
  x: 0,
  y: 0
};

const editWidgetSource = {
  beginDrag(props) {
    return {
      index: props.index,
      warning: props.warning
    };
  }
};

function editWidgetCollect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  };
}

export default DragSource('EDIT_WIDGET', editWidgetSource, editWidgetCollect)(EditWidget);
