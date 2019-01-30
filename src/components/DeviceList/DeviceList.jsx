import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import classNames from 'classnames';
import sort from 'alphanum-sort';
import queryString from 'query-string';
import ScrollIntoViewIfNeeded from './ScrollIntoView';
import { fetchDeviceNames } from '../../actions/tango';
import { setDeviceFilter, toggleExpandDomain, toggleExpandFamily } from '../../actions/deviceList';
import {
  getFilter,
  getFilteredDeviceNames,
  getHasDevices,
  getExpandedDomains,
  getExpandedFamilies
} from '../../selectors/deviceList';
import { getCurrentDeviceName } from '../../selectors/currentDevice';
import { getDeviceNamesAreLoading } from '../../selectors/loadingStatus';
import { unique } from '../../utils';
import './DeviceList.css';

const DeviceEntry = ({ domain, family, member, isSelected, filter }) => {
  const pathname = `/devices/${domain}/${family}/${member}`;
  const to =
    filter == null
      ? pathname
      : {
          pathname,
          search: `?filter=${filter}`
        };

  return (
    <Link to={to} onClick={e => e.stopPropagation()}>
      <div className={classNames('entry', { selected: isSelected })}>{member}</div>
    </Link>
  );
};

DeviceEntry.propTypes = {
  domain: PropTypes.string.isRequired,
  family: PropTypes.string.isRequired,
  member: PropTypes.string.isRequired,
  isSelected: PropTypes.bool.isRequired,
  filter: PropTypes.string.isRequired
};

const ExpanderArrow = ({ isExpanded }) => (
  <span className={classNames('expander-arrow', { expanded: isExpanded })} />
);

ExpanderArrow.propTypes = {
  isExpanded: PropTypes.bool
};

ExpanderArrow.defaultProps = {
  isExpanded: false
};

class DeviceList extends Component {
  constructor(props) {
    super(props);
    this.handleTextChange = this.handleTextChange.bind(this);
    this.handleToggleDomain = this.handleToggleDomain.bind(this);
    this.handleToggleFamily = this.handleToggleFamily.bind(this);
  }

  componentWillMount() {
    const { onInit } = this.props;
    onInit();
  }

  componentDidMount() {
    const { onSetFilter } = this.props;
    const filter = this.parseFilter();
    onSetFilter(filter || '');
  }

  componentDidUpdate(prevProps) {
    const { onSetFilter } = this.props;
    const filter = this.parseFilter();
    if (filter !== this.parseFilter(prevProps)) {
      onSetFilter(filter || '');
    }
  }

  handleTextChange(e) {
    const { onSetFilter } = this.props;
    onSetFilter(e.target.value);
  }

  handleToggleDomain(domain, event) {
    const { onToggleDomain } = this.props;
    event.preventDefault();
    onToggleDomain(domain);
  }

  handleToggleFamily(domain, family, event) {
    const { onToggleFamily } = this.props;
    event.stopPropagation();
    event.preventDefault();
    onToggleFamily(domain, family);
  }

  parseFilter(props) {
    const { search } = (props || this.props).location;
    return queryString.parse(search).filter;
  }

  render() {
    const {
      currentDeviceName,
      deviceNames,
      expandedDomains,
      expandedFamilies,
      filter
    } = this.props;

    const triplets = deviceNames.map(name => name.split('/'));
    const domains = unique(triplets.map(([domain, ,]) => domain));

    const entries = domains.map(domain => {
      const families = unique(
        triplets.filter(([domain2, ,]) => domain2 === domain).map(([, family]) => family)
      );

      const subEntries = families.map(family => {
        const members = sort(
          triplets
            .filter(([domain2, family2]) => domain2 === domain && family2 === family)
            .map(([, , member]) => member)
        );

        const subSubEntries = members.map(member => {
          const name = `${domain}/${family}/${member}`;
          const parsedFilter = this.parseFilter();
          return (
            <ScrollIntoViewIfNeeded key={name} isSelected={name === currentDeviceName}>
              <li key={name}>
                <DeviceEntry
                  isSelected={name === currentDeviceName}
                  domain={domain}
                  family={family}
                  member={member}
                  filter={parsedFilter}
                />
              </li>
            </ScrollIntoViewIfNeeded>
          );
        });

        const key = `${domain}/${family}`;
        const innerIsExpanded = filter.length > 0 || expandedFamilies.indexOf(key) !== -1;

        return (
          <div
            role="button"
            onClick={this.handleToggleFamily.bind(null, domain, family)}
            onKeyPress={this.handleToggleFamily.bind(null, domain, family)}
            tabIndex="0"
          >
            <li key={key}>
              <ExpanderArrow isExpanded={innerIsExpanded} />
              {family}
              {innerIsExpanded && <ul>{subSubEntries}</ul>}
            </li>
          </div>
        );
      });

      const isExpanded = filter.length > 0 || expandedDomains.indexOf(domain) !== -1;

      return (
        <div
          role="button"
          tabIndex="0"
          onClick={this.handleToggleDomain.bind(null, domain)}
          onKeyPress={this.handleToggleDomain.bind(null, domain)}
        >
          <li key={domain}>
            <ExpanderArrow isExpanded={isExpanded} />
            {domain}
            {isExpanded && <ul>{subEntries}</ul>}
          </li>
        </div>
      );
    });

    const className = classNames('device-list', {
      'has-search': filter.length > 0
    });
    return (
      <div className={className}>
        <div className="form-group search">
          <form>
            <input
              name="filter"
              className="form-control"
              type="text"
              placeholder="Search..."
              value={filter}
              onChange={this.handleTextChange}
              autoCapitalize="off"
              autoCorrect="off"
              spellCheck={false}
              title={`Filter on multiple terms, or prefix the query with 'glob:' to perform globbing, e.g. glob:sys/tg_test/+(1|2|3) or glob:sys/**`}
            />
          </form>
        </div>
        <div className="list">
          <ul>{entries}</ul>
        </div>
      </div>
    );
  }
}

DeviceList.propTypes = {
  currentDeviceName: PropTypes.string,
  deviceNames: PropTypes.arrayOf(PropTypes.string),
  expandedDomains: PropTypes.arrayOf(PropTypes.string),
  expandedFamilies: PropTypes.arrayOf(PropTypes.string),
  filter: PropTypes.string,
  onInit: PropTypes.func.isRequired,
  onSetFilter: PropTypes.func.isRequired,
  onToggleDomain: PropTypes.func.isRequired,
  onToggleFamily: PropTypes.func.isRequired
};

DeviceList.defaultProps = {
  currentDeviceName: '',
  deviceNames: [],
  expandedDomains: [],
  expandedFamilies: [],
  filter: ''
};

function mapStateToProps(state) {
  return {
    deviceNames: getFilteredDeviceNames(state),
    currentDeviceName: getCurrentDeviceName(state),
    hasDevices: getHasDevices(state),
    filter: getFilter(state),
    loading: getDeviceNamesAreLoading(state),

    expandedDomains: getExpandedDomains(state),
    expandedFamilies: getExpandedFamilies(state)
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onInit: () => dispatch(fetchDeviceNames()),
    onSetFilter: filter => dispatch(setDeviceFilter(filter)),

    onToggleDomain: domain => dispatch(toggleExpandDomain(domain)),
    onToggleFamily: (domain, family) => dispatch(toggleExpandFamily(domain, family))
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DeviceList);
