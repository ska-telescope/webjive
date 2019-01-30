import { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { preloadUser } from '../../actions/user';

class UserAware extends Component {
  componentWillMount() {
    const { preload } = this.props;
    preload();
  }

  render() {
    const { children } = this.props;
    return children;
  }
}

UserAware.propTypes = {
  preload: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired
};

function mapDispatchToProps(dispatch) {
  return {
    preload: () => dispatch(preloadUser())
  };
}

export default connect(
  null,
  mapDispatchToProps
)(UserAware);
