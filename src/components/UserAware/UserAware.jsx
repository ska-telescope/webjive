import { Component } from 'react';
import { connect } from 'react-redux';
import { preloadUser } from '../../actions/user';

class UserAware extends Component {
  componentWillMount() {
    this.props.preload();
  }

  render() {
    return this.props.children;
  }
}

function mapDispatchToProps(dispatch) {
  return {
    preload: () => dispatch(preloadUser())
  };
}

export default connect(
  null,
  mapDispatchToProps
)(UserAware);
