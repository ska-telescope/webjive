import React from 'react';
import PropTypes from 'prop-types';
import { widgetDefinitionPropType } from '../../../propTypes/propTypes';
import LibraryWidget from './LibraryWidget';

/* eslint-disable no-underscore-dangle */

const Library = ({ showCustom, widgetDefinitions }) => {
  const builtIn = widgetDefinitions.filter(definition => definition.__canvas__ == null);

  const custom = widgetDefinitions.filter(definition => definition.__canvas__ != null);

  return (
    <div className="Library">
      <h1>Built-In</h1>
      {builtIn.map(definition => (
        <LibraryWidget key={`${definition}${new Date().getTime()}`} definition={definition} />
      ))}
      {showCustom && (
        <React.Fragment>
          <h1>Custom</h1>
          {custom.map(definition => (
            <LibraryWidget key={`${definition}${new Date().getTime()}`} definition={definition} />
          ))}
        </React.Fragment>
      )}
    </div>
  );
};

Library.propTypes = {
  showCustom: PropTypes.bool,
  widgetDefinitions: PropTypes.arrayOf(widgetDefinitionPropType).isRequired
};

Library.defaultProps = {
  showCustom: false
};

export default Library;
