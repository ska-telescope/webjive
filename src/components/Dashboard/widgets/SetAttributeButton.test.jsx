import React from 'react';
import { shallow } from 'enzyme';
import { SetAttributeButton } from './SetAttributeButton';

describe('SetAttributeButton', () => {
  it('renders without crashing', () => {
    shallow(<SetAttributeButton />);
  });

  it('should have default props', () => {
    const { defaultProps } = SetAttributeButton;
    expect(defaultProps.mode).toBe('library');
    expect(defaultProps.device).toBe('');
    expect(defaultProps.attribute).toBe('');
    expect(defaultProps.params.value).toBeNull();
    expect(defaultProps.setDeviceAttribute).toBeDefined();
  });

  it('setDeviceAttribute should return the parameters by default', () => {
    const { setDeviceAttribute } = SetAttributeButton.defaultProps;
    const result = setDeviceAttribute('test', 'test', 1);
    expect(result).toEqual('test test 1');
  });

  it('has the correct text by default', () => {
    const text = 'Set device attribute';
    const wrapper = shallow(<SetAttributeButton />);
    expect(wrapper).toHaveText(text);
  });

  it('should not handle click events in library mode', () => {
    const mockFunction = jest.fn();
    const wrapper = shallow(
      <SetAttributeButton mode="library" setDeviceAttribute={mockFunction} />
    );
    wrapper.find('button').simulate('click');
    expect(mockFunction).not.toHaveBeenCalled();
  });

  it('should not handle click events in edit mode', () => {
    const mockFunction = jest.fn();
    const wrapper = shallow(<SetAttributeButton mode="edit" setDeviceAttribute={mockFunction} />);
    wrapper.find('button').simulate('click');
    expect(mockFunction).not.toHaveBeenCalled();
  });

  it('should handle click events in run mode', () => {
    const mockFunction = jest.fn();
    const wrapper = shallow(<SetAttributeButton mode="run" setDeviceAttribute={mockFunction} />);
    wrapper.find('button').simulate('click');
    expect(mockFunction).toHaveBeenCalled();
  });

  it('should handle changing devices', () => {
    const wrapper = shallow(<SetAttributeButton device="0" />);
    expect(wrapper).toHaveText('Set 0 attribute');
    wrapper.setProps({ device: '1' });
    expect(wrapper).toHaveText('Set 1 attribute');
  });

  it('should handle changing attributes', () => {
    const wrapper = shallow(<SetAttributeButton attribute="0" />);
    expect(wrapper).toHaveText('Set device 0');
    wrapper.setProps({ attribute: '1' });
    expect(wrapper).toHaveText('Set device 1');
  });

  it('should handle changing values', () => {
    const wrapper = shallow(<SetAttributeButton params={{ value: 0 }} />);
    expect(wrapper).toHaveText('Set device attribute 0');
    wrapper.setProps({ params: { value: 1 } });
    expect(wrapper).toHaveText('Set device attribute 1');
  });
});
