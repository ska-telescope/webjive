import React from 'react';
import { mount } from 'enzyme';
import configureMockStore from 'redux-mock-store';
import ConnectedSaveCanvases, { SaveCanvases } from './SaveCanvases';
import { SET_FILENAME } from '../../actions/actionTypes';

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

  describe('Filename Input', () => {
    it('should trigger the filename action on value change', () => {
      const wrapper = mount(<ConnectedSaveCanvases store={store} />);
      const filenameInput = wrapper.find('#filename-input');
      filenameInput.simulate('change', { value: 'test' });
      const actions = store.getActions();
      const expectedAction = { type: SET_FILENAME };
      expect(actions).toHaveLength(1);
      expect(actions.pop()).toMatchObject(expectedAction);
    });

    it('should call setFilename on change', () => {
      const mockFunction = jest.fn();
      const wrapper = mount(<SaveCanvases setFilename={mockFunction} />);
      const filenameInput = wrapper.find('#filename-input');
      filenameInput.simulate('change', { value: 'test' });
      expect(mockFunction).toHaveBeenCalled();
    });
  });
});
