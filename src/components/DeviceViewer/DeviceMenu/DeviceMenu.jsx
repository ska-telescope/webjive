import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const DeviceMenu = ({ hasProperties, hasAttributes, hasCommands, onSelectTab, selectedTab }) => {
  const mask = [true, hasProperties, hasAttributes, hasCommands];
  const tabTitles = ['Server', 'Properties', 'Attributes', 'Commands'];
  const tabs = tabTitles.map((title, i) => {
    const name = title.toLowerCase();
    return !mask[i] ? null : (
      <li className="nav-item" key={name}>
        <a
          href={`#${name}`}
          className={classNames('nav-link', { active: name === selectedTab })}
          onClick={onSelectTab.bind(null, name)}
        >
          {title}
        </a>
      </li>
    );
  });

  return (
    <div className="DeviceMenu">
      <ul className="nav nav-tabs section-chooser">{tabs}</ul>
    </div>
  );
};

DeviceMenu.propTypes = {
  hasProperties: PropTypes.bool,
  hasAttributes: PropTypes.bool,
  hasCommands: PropTypes.bool,
  selectedTab: PropTypes.string,
  onSelectTab: PropTypes.func.isRequired
};

DeviceMenu.defaultProps = {
  hasProperties: false,
  hasAttributes: false,
  hasCommands: false,
  selectedTab: 'server'
};

export default DeviceMenu;
