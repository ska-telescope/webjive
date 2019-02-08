import React from 'react';
import { mount } from 'enzyme';
import configureMockStore from 'redux-mock-store';
import { SaveCanvases } from './SaveCanvases';

jest.mock('js-file-download');

const mockStore = configureMockStore();
const store = mockStore();

describe('SaveCanvases Component', () => {
  beforeEach(() => {
    store.clearActions();
  });

  it('should render without crashing', () => {
    mount(<SaveCanvases />);
  });

  describe('Cancel Button', () => {
    it('should trigger a close modal action on click', () => {
      const mockFunction = jest.fn();
      const wrapper = mount(<SaveCanvases closeDialog={mockFunction} />);
      const cancelButton = wrapper.find('#cancel-button').first();
      cancelButton.simulate('click');
      expect(mockFunction).toHaveBeenCalled();
    });
  });

  describe('Save Button', () => {
    it('should call handleSaveClick on click', () => {
      const clickHandler = jest.spyOn(SaveCanvases.prototype, 'handleSaveClick');
      const wrapper = mount(<SaveCanvases />);
      const saveButton = wrapper.find('#save-button').first();
      saveButton.simulate('click');
      expect(clickHandler).toHaveBeenCalled();
    });
  });
});
