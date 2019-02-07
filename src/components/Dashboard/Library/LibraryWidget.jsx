import React from 'react';
import PropTypes from 'prop-types';
import { DragSource } from 'react-dnd';
import dndTypes from '../dndTypes';
import { libraryWidgetDefinition } from '../../../propTypes/propTypes';

const LibraryWidget = ({ definition, connectDragSource }) => {
  const Widget = definition.component;
  const defaultParams = definition.params.reduce(
    (accum, param) => ({ ...accum, [param.name]: param.default }),
    {}
  );

  return (
    <div className="LibraryWidget">
      <span style={{ fontSize: '10px', fontWeight: 'bold' }}>{definition.name}</span>
      {connectDragSource(
        <div>
          <Widget params={defaultParams} mode="library" />
        </div>
      )}
    </div>
  );
};

const libraryWidgetSource = {
  beginDrag(props) {
    return {
      definition: props.definition
    };
  }
};

function libraryWidgetCollect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  };
}

LibraryWidget.propTypes = {
  connectDragSource: PropTypes.func.isRequired,
  definition: libraryWidgetDefinition
};

LibraryWidget.defaultProps = {
  definition: {}
};

export default DragSource(dndTypes.LIBRARY_WIDGET, libraryWidgetSource, libraryWidgetCollect)(
  LibraryWidget
);
