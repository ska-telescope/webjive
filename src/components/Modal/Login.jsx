import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Modal, Button, FormGroup, ControlLabel, FormControl } from 'react-bootstrap';
import { login } from '../../actions/user';
import { getLoginFailure, getAwaitingResponse } from '../../selectors/user';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: ''
    };
    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
  }

  handleUsernameChange(e) {
    this.setState({ username: e.target.value });
  }

  handlePasswordChange(e) {
    this.setState({ password: e.target.value });
  }

  render() {
    const { awaitingResponse, closeDialog, loginFailure, onSubmit } = this.props;
    const { password, username } = this.state;
    return (
      <Modal.Dialog>
        <Modal.Header>
          <Modal.Title>Log In</Modal.Title>
        </Modal.Header>
        <form
          onSubmit={e => {
            e.preventDefault();
            onSubmit(username, password);
          }}
        >
          <Modal.Body>
            <FormGroup>
              <ControlLabel>Username</ControlLabel>
              <FormControl type="text" value={username} onChange={this.handleUsernameChange} />
            </FormGroup>
            <FormGroup>
              <ControlLabel>Password</ControlLabel>
              <FormControl type="password" value={password} onChange={this.handlePasswordChange} />
            </FormGroup>
            {loginFailure && (
              <div className="alert alert-danger" role="alert">
                Wrong username and/or password.
              </div>
            )}
            {awaitingResponse && (
              <div className="alert alert-info" role="alert">
                Logging in....
              </div>
            )}
          </Modal.Body>

          <Modal.Footer>
            <Button
              className="btn btn-outline-secondary"
              onClick={closeDialog}
              disabled={awaitingResponse}
            >
              Close
            </Button>
            <Button type="submit" className="btn btn-outline-primary" disabled={awaitingResponse}>
              Log In
            </Button>
          </Modal.Footer>
        </form>
      </Modal.Dialog>
    );
  }
}

Login.propTypes = {
  awaitingResponse: PropTypes.bool.isRequired,
  closeDialog: PropTypes.func.isRequired,
  loginFailure: PropTypes.bool.isRequired,
  onSubmit: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return {
    awaitingResponse: getAwaitingResponse(state),
    loginFailure: getLoginFailure(state)
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onSubmit: (username, password) => dispatch(login(username, password))
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
