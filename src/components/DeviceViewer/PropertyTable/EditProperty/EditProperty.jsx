import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { isMobile } from 'react-device-detect';

class EditProperty extends Component {
  constructor(props) {
    super(props);
    this.handleShow = this.handleShow.bind(this);
    this.removeShow = this.removeShow.bind(this);
  }

  handleShow() {
    const { name, showEditPropertyDialog } = this.props;
    showEditPropertyDialog(name);
  }

  removeShow() {
    const { name, showDeletePropertyDialog } = this.props;
    showDeletePropertyDialog(name);
  }

  render() {
    return (
      <Fragment>
        <i
          role="button"
          tabIndex="0"
          className={['fa', 'fa-trash', isMobile ? 'visible' : '']}
          onClick={this.removeShow}
          onKeyPress={this.removeShow}
        />{' '}
        &nbsp;
        <i
          role="button"
          tabIndex="0"
          className={['fa', 'fa-pencil', isMobile ? 'visible' : '']}
          onClick={this.handleShow}
          onKeyPress={this.handleShow}
        />
      </Fragment>
    );
  }
}

EditProperty.propTypes = {
  name: PropTypes.string.isRequired,
  showEditPropertyDialog: PropTypes.func.isRequired,
  showDeletePropertyDialog: PropTypes.func.isRequired
};

export default EditProperty;
