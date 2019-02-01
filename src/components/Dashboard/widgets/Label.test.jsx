import React from 'react';
import { shallow } from 'enzyme';
import Label from './Label';

describe('Label Widget', () => {
  it('renders without crashing', () => {
    shallow(<Label />);
  });

  it('shows `Your Text Here` in edit mode', () => {
    const wrapper = shallow(<Label mode="edit" />);
    expect(wrapper).toHaveText('Your Text Here');
  });
});
