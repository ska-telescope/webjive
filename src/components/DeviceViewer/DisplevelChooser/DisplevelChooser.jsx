import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './DisplevelChooser.css';

export default class DisplevelChooser extends Component {
  handleInputChange(name, e) {
    const { disableDisplevel, enableDisplevel } = this.props;
    if (e.target.checked) {
      enableDisplevel(name);
    } else {
      disableDisplevel(name);
    }
  }

  render() {
    const { displevels, enabledList } = this.props;
    const inputs = displevels.map(name => (
      <label key={name} htmlFor={`displevel_${name}`}>
        <input
          id={`displevel_${name}`}
          type="checkbox"
          checked={enabledList.indexOf(name) !== -1}
          onChange={this.handleInputChange.bind(this, name)}
        />
        {name}
      </label>
    ));

    return <div className="DisplevelChooser">{inputs}</div>;
  }
}

DisplevelChooser.propTypes = {
  displevels: PropTypes.arrayOf(PropTypes.string).isRequired,
  enabledList: PropTypes.arrayOf(PropTypes.string).isRequired,
  enableDisplevel: PropTypes.func.isRequired,
  disableDisplevel: PropTypes.func.isRequired
};
