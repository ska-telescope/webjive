import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { executeCommand } from '../../actions/tango';
import getServerSummary from '../../selectors/server';

import './HomeViewer.css';

class HomeViewer extends Component {
  componentDidMount() {
    const { onLoad } = this.props;
    onLoad();
  }

  render() {
    const { summary } = this.props;
    return summary ? (
      <div className="HomeViewer">
        {summary.map(line => (
          <p key={line}>{line.trim()}</p>
        ))}
      </div>
    ) : null;
  }
}

function mapStateToProps(state) {
  return {
    summary: getServerSummary(state)
  };
}

HomeViewer.propTypes = {
  summary: PropTypes.arrayOf(PropTypes.string),
  onLoad: PropTypes.func.isRequired
};

HomeViewer.defaultProps = {
  summary: ['']
};

function mapDispatchToProps(dispatch) {
  return {
    onLoad: () => dispatch(executeCommand('DbInfo', '', 'sys/database/2'))
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomeViewer);
