import { createElement, createRef, PureComponent } from 'react';
import scrollIntoViewIfNeeded from 'scroll-into-view';
import PropTypes from 'prop-types';

/*
This code is based on src/index.js from https://www.npmjs.com/package/react-scroll-into-view-if-needed
*/
export default class ScrollIntoViewIfNeeded extends PureComponent {
  static defaultProps = {
    active: true,
    elementType: 'div',
    options: {
      behavior: 'smooth',
      scrollMode: 'if-needed'
    }
  };

  constructor() {
    super();
    this.node = createRef();
  }

  componentDidMount() {
    const { active, isSelected } = this.props;
    if (active && isSelected) {
      this.handleScrollIntoViewIfNeeded();
    }
  }

  componentDidUpdate({ active, isNowActive, isSelected }) {
    if (!active && isNowActive && isSelected) {
      this.handleScrollIntoViewIfNeeded();
    }
  }

  handleScrollIntoViewIfNeeded = () => {
    const { options } = this.props;
    scrollIntoViewIfNeeded(this.node.current, options);
  };

  render() {
    const { active, elementType, children, options, ...wrapperProps } = this.props;
    return createElement(elementType, { ref: this.node, ...wrapperProps }, children);
  }
}

ScrollIntoViewIfNeeded.propTypes = {
  active: PropTypes.bool,
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
  elementType: PropTypes.string,
  isNowActive: PropTypes.bool,
  isSelected: PropTypes.bool.isRequired,
  options: PropTypes.shape({
    behavior: PropTypes.string,
    ease: PropTypes.func,
    scrollMode: PropTypes.string,
    time: PropTypes.number
  })
};
