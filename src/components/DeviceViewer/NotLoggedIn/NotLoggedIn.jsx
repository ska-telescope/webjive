import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getIsLoggedIn } from '../../../selectors/user';
import { setModal } from '../../../actions/modal';

class NotLoggedIn extends Component {
  constructor(props) {
    super(props);
    this.handleGoToLogin = this.handleGoToLogin.bind(this);
  }

  handleGoToLogin(e) {
    e.preventDefault();
    const { onGoToLogin } = this.props;
    onGoToLogin();
  }

  render() {
    const { isLoggedIn, children } = this.props;
    return isLoggedIn ? null : (
      <div className="alert alert-warning" role="alert">
        {children}{' '}
        <button type="button" href="#" onClick={this.handleGoToLogin}>
          Click here to log in.
        </button>
      </div>
    );
  }
}

NotLoggedIn.propTypes = {
  children: PropTypes.node,
  onGoToLogin: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool
};

NotLoggedIn.defaultProps = {
  children: null,
  isLoggedIn: false
};

function mapStateToProps(state) {
  return {
    isLoggedIn: getIsLoggedIn(state)
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onGoToLogin: () => dispatch(setModal('LOGIN'))
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NotLoggedIn);
