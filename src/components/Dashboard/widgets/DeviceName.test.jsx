import React from 'react';
import { shallow } from 'enzyme';
import DeviceName from './DeviceName';

describe('Device Name Widget', () => {
  it('renders without crashing', () => {
    shallow(<DeviceName device="sys/test/1" />);
  });

  it('shows `Device Name` in library mode', () => {
    const wrapper = shallow(<DeviceName device="sys/test/1" mode="library" />);
    expect(wrapper).toHaveText('Device Name');
  });

  it('shows `Parent Device` when device is `__parent__`', () => {
    const wrapper = shallow(<DeviceName device="__parent__" />);
    expect(wrapper).toHaveText('Parent Device');
  });

  it('shows the correct device name in edit mode', () => {
    const device = 'sys/test/1';
    const wrapper = shallow(<DeviceName device={device} mode="edit" />);
    expect(wrapper).toHaveText(device);
  });
});
