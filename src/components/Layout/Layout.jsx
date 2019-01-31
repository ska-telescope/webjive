import React from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';
import * as qs from 'query-string';

import DeviceList from '../DeviceList/DeviceList';
import DeviceViewer from '../DeviceViewer/DeviceViewer';
import HomeViewer from '../HomeViewer/HomeViewer';
import ErrorDisplay from '../ErrorDisplay/ErrorDisplay';
import Dashboard from '../Dashboard/Dashboard';
import ModalDialog from '../Modal/Modal';
import LogInOut from '../LogInOut/LogInOut';

import './Layout.css';

const BaseLayout = ({ children }) => <div className="Layout">{children}</div>;

BaseLayout.propTypes = {
  children: PropTypes.node.isRequired
};

const MainView = ({ className }) => (
  <div className={className}>
    <LogInOut />
    <ErrorDisplay />
    <ModalDialog />
    <Route path="/dashboard" exact component={Dashboard} />
    <Route path="/devices/:device*" component={DeviceViewer} />
    <Route path="/" exact component={HomeViewer} />
  </div>
);

MainView.propTypes = {
  className: PropTypes.string.isRequired
};

const DefaultLayout = () => (
  <BaseLayout>
    <div className="left-column">
      <Route path="/" component={DeviceList} />
    </div>
    <MainView className="right-column" />
  </BaseLayout>
);

const SimpleLayout = () => (
  <BaseLayout>
    <MainView className="double-column" />
  </BaseLayout>
);

const Layout = ({ location: { search } }) =>
  'no_sidebar' in qs.parse(search) ? <SimpleLayout /> : <DefaultLayout />;

Layout.propTypes = {
  location: PropTypes.shape({ search: PropTypes.string })
};

Layout.defaultProps = {
  location: { search: '' }
};

export default Layout;
