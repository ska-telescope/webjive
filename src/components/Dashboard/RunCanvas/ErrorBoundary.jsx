import React, { Component } from 'react';
import PropTypes from 'prop-types';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { error: null };
  }

  componentDidCatch(error) {
    this.setState({ error });
  }

  render() {
    const { error } = this.state;
    const { children } = this.props;
    if (error == null) {
      return children;
    }

    return <div style={{ backgroundColor: '#ff8888' }}>{String(error)}</div>;
  }
}

ErrorBoundary.propTypes = {
  children: PropTypes.node
};

ErrorBoundary.defaultProps = {
  children: null
};

export default ErrorBoundary;
