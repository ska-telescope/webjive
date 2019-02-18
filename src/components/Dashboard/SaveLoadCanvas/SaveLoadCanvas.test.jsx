import React from 'react';
import { shallow } from 'enzyme';
import configureMockStore from 'redux-mock-store';
import ConnectedSaveLoadCanvas, { SaveLoadCanvas } from './SaveLoadCanvas';
import { SAVE_CANVASES } from '../../../actions/modal';
import { SET_MODAL } from '../../../actions/actionTypes';

const mockStore = configureMockStore();
const store = mockStore();

describe('SaveLoadCanvas component', () => {
  it('renders without crashing', () => {
    const mockFunction = jest.fn();
    shallow(<SaveLoadCanvas onLoadFile={mockFunction} />);
  });

  describe('Save Button', () => {
    it('should handle save button clicks', () => {
      const clickHandler = jest.spyOn(SaveLoadCanvas.prototype, 'handleSaveButtonClick');
      const wrapper = shallow(<SaveLoadCanvas />);
      const saveButton = wrapper.find('#save-button');
      saveButton.simulate('click');
      expect(clickHandler).toHaveBeenCalled();
    });

    it('trigger the set modal action on save click', () => {
      const wrapper = shallow(<ConnectedSaveLoadCanvas store={store} />);
      wrapper.props().onSave();
      const actions = store.getActions();
      const expectedAction = { type: SET_MODAL, modalInstance: SAVE_CANVASES, entity: undefined };
      expect(actions).toContainEqual(expectedAction);
    });
  });

  describe('onFilesChange', () => {
    let wrapper;

    beforeEach(() => {
      const mockFunction = jest.fn();
      wrapper = shallow(<SaveLoadCanvas onLoadFile={mockFunction} />);
    });

    it('creates a new file reader', () => {
      wrapper.instance().onFilesChange();
      expect(wrapper.instance().fileReader).not.toBeNull();
    });

    it('sets the file reader onloadend method', () => {
      wrapper.instance().onFilesChange();
      expect(wrapper.instance().fileReader.onloadend).not.toBeNull();
    });

    it('reads the latest file if it exists', () => {
      const fakeFile = new Blob(['Hello, World!', { type: 'text/plain' }]);
      fakeFile.lastModifiedDate = '';
      fakeFile.name = 'test.txt';
      const files = [fakeFile];
      wrapper.instance().onFilesChange(files);
      expect(files).toHaveLength(0);
    });
  });

  describe('handleFileRead', () => {
    let wrapper;
    let mockFunction;

    beforeEach(() => {
      mockFunction = jest.fn();
      wrapper = shallow(<SaveLoadCanvas onLoadFile={mockFunction} />);
    });

    it('calls onLoad prop function', () => {
      wrapper.instance().fileReader = new FileReader();
      wrapper.instance().fileReader.onloadend = () => null;
      wrapper.instance().handleFileRead();
      expect(mockFunction).toHaveBeenCalled();
    });
  });
});
