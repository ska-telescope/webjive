import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { setModal } from '../../actions/modal';
import { logout } from '../../actions/user';
import { getIsLoggedIn, getUsername, getAwaitingResponse } from '../../selectors/user';

const LogInOut = ({ awaitingResponse, isLoggedIn, onLogin, onLogout, username }) =>
  awaitingResponse ? null : (
    <div
      style={{
        fontSize: '0.75em',
        position: 'absolute',
        top: '0.5em',
        right: '0.5em'
      }}
    >
      {isLoggedIn ? (
        <Fragment>
          Logged in as <span style={{ fontWeight: 'bold' }}>{username}</span>.{' '}
          <button
            type="button"
            href="#"
            onClick={e => {
              e.preventDefault();
              onLogout();
            }}
          >
            Log Out
          </button>
        </Fragment>
      ) : (
        <Fragment>
          Not logged in.{' '}
          <button
            type="button"
            href="#"
            onClick={e => {
              e.preventDefault();
              onLogin();
            }}
          >
            Log In
          </button>
        </Fragment>
      )}
    </div>
  );

LogInOut.propTypes = {
  awaitingResponse: PropTypes.bool.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
  onLogin: PropTypes.func.isRequired,
  onLogout: PropTypes.func.isRequired,
  username: PropTypes.string
};

LogInOut.defaultProps = {
  username: ''
};

function mapStateToProps(state) {
  return {
    isLoggedIn: getIsLoggedIn(state),
    username: getUsername(state),
    awaitingResponse: getAwaitingResponse(state)
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onLogin: () => dispatch(setModal('LOGIN')),
    onLogout: () => dispatch(logout())
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LogInOut);
