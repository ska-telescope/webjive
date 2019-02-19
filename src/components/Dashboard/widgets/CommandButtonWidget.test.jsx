import React from 'react';
import { shallow } from 'enzyme';
import { CommandButtonWidget } from './CommandButtonWidget';

describe('Command Button Widget', () => {
  it('renders without crashing', () => {
    shallow(<CommandButtonWidget />);
  });
  it('should have default props', () => {
    const { defaultProps } = CommandButtonWidget;
    expect(defaultProps.mode).toBe('library');
    expect(defaultProps.device).toBe('');
    expect(defaultProps.command).toBe('');
    expect(defaultProps.params.value).toBeNull();
  });
  it('shows `Device Name` without command', () => {
    const device = 'sys/test/1';
    const wrapper = shallow(<CommandButtonWidget device={device} mode="library" />);
    expect(wrapper).toHaveText(`Set ${device} command`);
  });
  it('shows `Device Name` and `Command`', () => {
    const device = 'sys/test/1';
    const command = 'SwitchState';
    const wrapper = shallow(<CommandButtonWidget device={device} command = {command} mode="library" />);
    expect(wrapper).toHaveText(`Set ${device} ${command}`);
  });
  it('should not click command button in edit mode', () => {
    const device = 'sys/test/1';
    const command = 'SwitchState';
    const mockFunction = jest.fn();
    const wrapper = shallow(<CommandButtonWidget mode="edit" device={device} command = {command} />);
    wrapper.find('button').simulate('click');
    expect(mockFunction).not.toHaveBeenCalled();
  });
  it('should handle click events in run mode', () => {
    const device = 'sys/test/1';
    const command = 'SwitchState';
    const mockFunction = jest.fn();
    const wrapper = shallow(<CommandButtonWidget mode="run" device={device} command = {command} executeCommand={mockFunction} />);
    wrapper.find('button').simulate('click');
    expect(mockFunction).toHaveBeenCalled();
  });
  it('should change `Command` and `Device`', () => {
    const device = 'sys/test/1';
    const command = 'SwitchState';
    const device2 = 'dserver/TangoTest/test';
    const command2 = 'Init';
    const wrapper = shallow(<CommandButtonWidget device={device} command = {command} mode="library" />);
    wrapper.setProps({ command: command2, device: device2 });
    expect(wrapper).toHaveText(`Set ${device2} ${command2}`);
  });
});
