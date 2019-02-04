import React, { Component } from 'react';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { error: null };
  }

  componentDidCatch(error) {
    this.setState({ error });
  }

  render() {
    if (this.state.error == null) {
      return this.props.children;
    }

    return <div style={{ backgroundColor: '#ff8888' }}>{String(this.state.error)}</div>;
  }
}

export default ErrorBoundary;
