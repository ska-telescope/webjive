import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCurrentDeviceServer } from '../../../selectors/currentDevice';
import './ServerInfo.css';

const ServerInfo = ({ server }) =>
  server == null ? (
    'No server information available.'
  ) : (
    <div className="ServerInfo">
      <table className="ServerInfo">
        <tbody>
          <tr>
            <th>Server</th>
            <td>{server.id}</td>
          </tr>
          <tr>
            <th>Host</th>
            <td>{server.host}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
ServerInfo.propTypes = {
  server: PropTypes.shape({
    id: PropTypes.string,
    host: PropTypes.string
  }).isRequired
};

function mapStateToProps(state) {
  return {
    server: getCurrentDeviceServer(state)
  };
}

export default connect(mapStateToProps)(ServerInfo);
