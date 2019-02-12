import React from 'react';
import { shallow } from 'enzyme';
import { Dashboard } from './Dashboard';

describe('Dashboard component', () => {
  describe('setHistory', () => {
    it('sets the history prop', () => {
      const wrapper = shallow(<Dashboard />);
      const canvases = { test: ['test'] };
      console.log(wrapper.instance().props);
      wrapper.instance().setHistory(canvases);
      console.log(wrapper.instance().props);
    });
  });

  describe('handleLoadCanvases', () => {});
});
